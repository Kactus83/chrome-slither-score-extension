import { loadLocalDatas } from './local-datas.js';

export class SessionStatsService {
  constructor() {
    this.datas = null;
    this.initialize();
  }

  async initialize() {
    this.datas = await loadLocalDatas();
  }

  async updateDatas() {
    this.datas = await loadLocalDatas();
  }

  async ensureDatas() {
    if (!this.datas || !this.datas.actual_session) {
      await this.updateDatas();
    }
  }

  async getNextPlayer() {
    await this.ensureDatas();

    const players = this.datas.actual_session.player_names;
    const scores = this.datas.actual_session.scores;
    const scoreCounts = {};

    players.forEach(player => {
      scoreCounts[player] = 0;
    });

    scores.forEach(score => {
      scoreCounts[score.playerName]++;
    });

    return players.sort((a, b) => scoreCounts[a] - scoreCounts[b])[0];
  }

  async getPlayerBestScore(playerName) {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerName === playerName);

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

    const players = this.datas.actual_session.player_names;
    const bestScores = await Promise.all(players.map(async playerName => ({
      playerName,
      bestScore: await this.getPlayerBestScore(playerName),
    })));

    return bestScores.sort((a, b) => b.bestScore - a.bestScore);
  }

  async getAverageScoreRanking() {
    await this.ensureDatas();

    const players = this.datas.actual_session.player_names;
    const playerStatsService = new PlayerStatsService();

    const averageScores = await Promise.all(players.map(async playerName => ({
      playerName,
      averageScore: await playerStatsService.getPlayerAverageScore(playerName),
    })));

    return averageScores.sort((a, b) => b.averageScore - a.averageScore);
  }

  async getPlayerScoreCount(playerName) {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerName === playerName);

    return playerScores.length;
  }

  async getPlayerTotalScore(playerName) {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerName === playerName);

    return playerScores.reduce((sum, score) => sum + score.value, 0);
  }

  async getTotalScores() {
    await this.ensureDatas();

    const players = this.datas.actual_session.player_names;
    const totalScores = {};

    players.forEach(playerName => {
      totalScores[playerName] = this.getPlayerTotalScore(playerName);
    });

    return totalScores;
  }

  async getLastScore() {
    await this.ensureDatas();

    const scores = this.datas.actual_session.scores;

    if (scores.length === 0) {
      return null;
    }
    // Trie les scores par date (ordre décroissant)
    const sortedScores = scores.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedScores[0];
  }
}
