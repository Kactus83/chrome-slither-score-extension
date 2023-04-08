import { Score } from '../../models/models.js';

export class GameRules {
  constructor(session) {
    this.session = session;
  }

  countPlayerScores(playerId) {
    return this.session.scores.filter(score => score.playerId === playerId && score.scoreCounts).length;
  }

  isScoreValid(value) {
    return value >= this.session.session_params.scoreLimit;
  }

  isOverPlayed(playerId) {
    const currentPlayerScoreCount = this.countPlayerScores(playerId);
    const otherPlayerScores = this.session.scores.filter(score => score.playerId !== playerId);
    const otherPlayerMinScoreCount = Math.min(...otherPlayerScores.map(score => this.countPlayerScores(score.playerId)), 1);
    return currentPlayerScoreCount - otherPlayerMinScoreCount > 1;
  }

  isActualScoreExtraTurn(value) {
    const playerId = this.session.current_score.playerId;
    const lastScore = this.session.scores.slice(-1)[0];
    const level = this.session.session_params.playerParams.find(p => p.playerId === playerId).level;
  
    if ((!lastScore || lastScore.playerId !== playerId) && (!this.isScoreValid(value) || level !== 'difficile')) {
      return true;
    }
  
    return false;
  }  
  
  finalizeCurrentScore(value) {
    const currentScore = this.session.current_score;
    const playerId = currentScore.playerId;
    const playerName = currentScore.playerName;
    const startDate = currentScore.startDate;
    const endDate = new Date(); // Vous pouvez utiliser la date actuelle ou la récupérer à partir de currentScore si elle est déjà définie

    const overPlayed = this.isOverPlayed(playerId);
    const isBelowLimit = !this.isScoreValid(value);
    const level = this.session.session_params.playerParams.find(p => p.playerId === playerId).level;
    const lastScore = this.session.scores.slice(-1)[0];
    const lastPlayerId = lastScore?.playerId;
    const extraTurn = this.isActualScoreExtraTurn(value);
    const countScore = !overPlayed && level === 'facile' && isBelowLimit && (!lastScore || lastScore.extraTurn || lastPlayerId !== playerId);

    return new Score(playerId, playerName, value, startDate, endDate, extraTurn, overPlayed, countScore);
  }
}
