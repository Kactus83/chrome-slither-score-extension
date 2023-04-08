import { loadLocalDatas } from './local-datas.js';

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
    const scores = this.datas.actual_session.scores;
    const scoreCounts = {};

    players.forEach(player => {
      scoreCounts[player.playerId] = 0;
    });

    scores.forEach(score => {
      if (!score.extraTurn) {
        scoreCounts[score.playerId]++;
      }
    });

    return players.sort((a, b) => scoreCounts[a.playerId] - scoreCounts[b.playerId]).map(player => ({
      id: player.playerId,
      name: player.name,
      difficulty: player.difficulty
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

