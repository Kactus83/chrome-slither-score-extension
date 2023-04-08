import { loadLocalDatas } from './local-datas.js';
import { GameRules } from './game-rules.js';

export class SessionStatsService {
  constructor() {
    this.datas = null;
    this.initialize();
  }

  async initialize() {
    this.datas = await loadLocalDatas();
    console.log(this.datas);
  }

  async updateDatas() {
    this.datas = await loadLocalDatas();
  }

  async ensureDatas() {
    if (!this.datas || !this.datas.actual_session) {
      await this.updateDatas();
    }
  }
  
  async getNextPlayers() {
    await this.ensureDatas();
  
    const players = this.datas.actual_session.session_params.playerParams;
    const lastScore = this.datas.actual_session.scores.slice(-1)[0];
    const gameRules = new GameRules(this.datas.actual_session);
  
    // Création d'un tableau de paires joueur-scoreCount
    const scoreCounts = players.map(player => {
      const scoreCount = gameRules.countPlayerScores(player.playerId);
      return [player, scoreCount];
    });
  
    // Triage des paires en fonction du scoreCount (ordre croissant)
    scoreCounts.sort((a, b) => a[1] - b[1]);
  
    // Si le dernier score a un extraTurn, placez ce joueur en premier dans la liste
    if (lastScore && lastScore.extraTurn) {
      const extraTurnPlayerIndex = scoreCounts.findIndex(pair => pair[0].playerId === lastScore.playerId);
      const extraTurnPlayer = scoreCounts.splice(extraTurnPlayerIndex, 1)[0];
      scoreCounts.unshift(extraTurnPlayer);
    }
  
    // Récupération des joueurs triés et conversion en objet
    return scoreCounts.map(pair => ({
      id: pair[0].playerId,
      name: pair[0].name,
      difficulty: pair[0].difficulty
    }));
  }

  async getPlayerBestScore(playerId) {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerId === playerId);

    return Math.max(...playerScores.map(score => score.value));
  }

  async getSessionAverageScore() {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;

    if (scores.length === 0) {
      return 0;
    }

    const totalScore = scores.reduce((sum, score) => sum + score.value, 0);

    return totalScore / scores.length;
  }

  async getBestScoreRanking() {
    await this.ensureDatas();
  
    const players = this.datas.actual_session.session_params.playerParams;
    const bestScores = await Promise.all(players.map(async player => ({
      playerId: player.playerId,
      playerName: player.name,
      bestScore: await this.getPlayerBestScore(player.playerId),
    })));
  
    return bestScores.sort((a, b) => b.bestScore - a.bestScore);
  }  

  async getAverageScoreRanking() {
    await this.ensureDatas();

    const players = this.datas.actual_session.session_params.playerParams;
    const playerStatsService = new PlayerStatsService();

    const averageScores = await Promise.all(players.map(async player => ({
      playerId: player.playerId,
      playerName: player.name,
      averageScore: await playerStatsService.getPlayerAverageScore(player.playerId),
    })));

    return averageScores.sort((a, b) => b.averageScore - a.averageScore);
  }

  async getPlayerScoreCount(playerId) {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerId === playerId);

    return playerScores.length;
  }

  async getPlayerTotalScore(playerId) {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerId === playerId);

    return playerScores.reduce((sum, score) => sum + score.value, 0);
  }

  async getTotalScores() {
    await this.ensureDatas();

    const players = this.datas.actual_session.session_params.playerParams;
    const totalScores = {};

    players.forEach(player => {totalScores[player.playerId] = this.getPlayerTotalScore(player.playerId);
    });

    return totalScores;
  }

  async getLastScore() {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;

    if (scores.length === 0) {
      console.log("pas de score à renvoyer..");
      return null;
    }

    // Trie les scores par date (ordre croissant)
    const sortedScores = scores.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    // Retourne le score le plus récent (dernier élément du tableau trié)
    return sortedScores[sortedScores.length - 1];
  }

}

