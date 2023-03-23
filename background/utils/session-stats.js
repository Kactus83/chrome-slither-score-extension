import { loadLocalDatas } from './local-datas.js';

export class SessionStatsService {
  constructor() {
    this.datas = loadLocalDatas();
  }

  updateDatas() {
    this.datas = loadLocalDatas();
  }

  getNextPlayer() {
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

  getPlayerBestScore(playerName) {
    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerName === playerName);

    return Math.max(...playerScores.map(score => score.value));
  }

  getSessionAverageScore() {
    const scores = this.datas.actual_session.scores;

    if (scores.length === 0) {
      return 0;
    }

    const totalScore = scores.reduce((sum, score) => sum + score.value, 0);

    return totalScore / scores.length;
  }

  getBestScoreRanking() {
    const players = this.datas.actual_session.player_names;
    const bestScores = players.map(playerName => ({
      playerName,
      bestScore: this.getPlayerBestScore(playerName),
    }));

    return bestScores.sort((a, b) => b.bestScore - a.bestScore);
  }

  getAverageScoreRanking() {
    const players = this.datas.actual_session.player_names;
    const playerStatsService = new PlayerStatsService();

    const averageScores = players.map(playerName => ({
      playerName,
      averageScore: playerStatsService.getPlayerAverageScore(playerName),
    }));

    return averageScores.sort((a, b) => b.averageScore - a.averageScore);
  }

  getPlayerScoreCount(playerName) {
    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerName === playerName);

    return playerScores.length;
  }

  getPlayerTotalScore(playerName) {
    const scores = this.datas.actual_session.scores;
    const playerScores = scores.filter(score => score.playerName === playerName);

    return playerScores.reduce((sum, score) => sum + score.value, 0);
  }

  getTotalScores() {
    const players = this.datas.actual_session.player_names;
    const totalScores = {};

    players.forEach(playerName => {
      totalScores[playerName] = this.getPlayerTotalScore(playerName);
    });

    return totalScores;
  }
}