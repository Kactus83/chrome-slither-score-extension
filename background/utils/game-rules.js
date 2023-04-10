import { Score } from '../../models/models.js';

export class GameRules {
  constructor(session) {
    this.session = session;
  }

  countPlayerScores(playerId) {
    let scoreCount = 0;
    let isLastScoreExtraTurn = false;
  
    for (let i = 0; i < this.session.scores.length; i++) {
      const score = this.session.scores[i];
  
      if (score.playerId === playerId) {
        if (!isLastScoreExtraTurn || (isLastScoreExtraTurn && score.extraTurn)) {
          scoreCount++;
        }
      }
  
      isLastScoreExtraTurn = score.extraTurn && score.playerId === playerId;
    }
  
    console.log(playerId, scoreCount);
    return scoreCount;
  }

  isScoreValid(value) {
    return value >= this.session.session_params.minScoreToReplay;
  }

  isOverPlayed(playerId) {
    const currentPlayerScoreCount = this.countPlayerScores(playerId);
    const lastScore = this.session.scores.slice(-1)[0];
    const otherPlayerIds = this.session.session_params.playerParams
      .filter(player => player.playerId !== playerId)
      .map(player => player.playerId);
  
    const otherPlayerMinScoreCount = Math.min(
      ...otherPlayerIds.map(id => this.countPlayerScores(id))
    );
  
    if (currentPlayerScoreCount - otherPlayerMinScoreCount >= 1 && (lastScore.playerId === playerId && lastScore.extraTurn)) {
      return true;
    }
  
    if (currentPlayerScoreCount - otherPlayerMinScoreCount >= 2) {
      return true;
    }
  
    return false;
  }
  
  isActualScoreExtraTurn(value) {
    const playerId = this.session.current_score.playerId;
    const lastScore = this.session.scores.slice(-1)[0];
    const level = this.session.session_params.playerParams.find(p => p.playerId === playerId).level;
  
    // Vérifie si le dernier score n'est pas un extraTurn du même joueur
    const isNewTurn = !lastScore || lastScore.playerId !== playerId || !lastScore.extraTurn;
    console.log(lastScore, this.isScoreValid(value));
  
    // Si c'est un nouveau tour, que la difficulté n'est pas 'difficile' et que le score n'est pas valide,
    // alors le joueur a un extraTurn, sinon false
    if (isNewTurn && level !== 'difficile' && !this.isScoreValid(value)) {
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
    const extraTurn = !overPlayed && this.isActualScoreExtraTurn(value);
    console.log(level, extraTurn, overPlayed);
    const countScore = !(level === 'facile' && !overPlayed && extraTurn);

    return new Score(playerId, playerName, value, startDate, endDate, extraTurn, overPlayed, countScore);
  }
}
