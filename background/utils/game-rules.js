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
  
    determineScoreProperties(playerId, playerName, value, difficulty, startDate, endDate) {
      let additionalTurn = false;
      let overPlayed = this.isOverPlayed(playerId);
      let countInStats = true;
  
      if (!overPlayed) {
        if (!this.isScoreValid(value)) {
          if (difficulty === 'facile') {
            additionalTurn = true;
            countInStats = false;
          } else if (difficulty === 'moyen') {
            additionalTurn = true;
            countInStats = true;
          }
        }
      }
  
      return new Score(playerId, playerName, value, startDate, endDate, additionalTurn, overPlayed, countInStats);
    }
  }
  