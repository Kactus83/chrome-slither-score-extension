// La classe LocalDatas représente les données locales de l'application.
export class LocalDatas {
    players = []; // Liste des joueurs existants
    actual_session = null; // Session en cours, null si aucune session en cours
    archives = []; // Liste des sessions archivées
  }
  
  // La classe PlayerParam représente les paramètres d'un joueur dans une session.
  export class PlayerParam {
    playerId; // Identifiant du joueur
    name; // Nom du joueur
    difficulty; // Difficulté choisie par le joueur
    constructor(playerId, name, difficulty) {
      this.playerId = playerId;
      this.name = name;
      this.difficulty = difficulty;
    }
  }
  
  // La classe SessionParams représente les paramètres d'une session.
  export class SessionParams {
    playerParams = []; // Liste des objets PlayerParam pour chaque joueur
    minScoreToReplay = 0; // Score minimum pour rejouer
    constructor(playerParams, minScoreToReplay) {
      this.playerParams = playerParams;
      this.minScoreToReplay = minScoreToReplay;
    }
  }
  
  // La classe Session représente une session de jeu, avec une liste de joueurs et de scores.
  export class Session {
    session_params = null; // Instance de SessionParams pour cette session
    current_score = null; // Score en cours, null si aucun score en cours
    scores = []; // Liste des scores dans cette session
    constructor(id, date, session_params) {
      this.id = id; // Identifiant unique de la session
      this.date = date; // Date de début de la session
      this.session_params = session_params; // Paramètres de la session
    }
  }
  
  // La classe Player représente un joueur, avec son identifiant, son nom et les sessions auxquelles il a participé.
  export class Player {
    id;
    name;
    registrationDate; // Date d'enregistrement du joueur
    session_ids = []; // Liste des identifiants de session auxquelles le joueur a participé
    constructor(id, name, registrationDate) {
      this.id = id; // Identifiant unique du joueur
      this.name = name; // Nom du joueur
      this.registrationDate = registrationDate; // Date d'enregistrement du joueur
    }
  }
  
// La classe Score représente un score, avec l'identifiant du joueur, le nom du joueur, la valeur du score, la date de début et la date de fin.
export class Score {
  constructor(playerId, playerName, value, startDate, endDate, extraTurn = false, scoreCounts = true) {
    this.playerId = playerId; // Identifiant du joueur ayant obtenu ce score
    this.playerName = playerName; // Nom du joueur ayant obtenu ce score
    this.value = value; // Valeur du score
    this.startDate = startDate; // Date de début du score
    this.endDate = endDate; // Date de fin du score
    this.extraTurn = extraTurn; // Indique si le score donne droit à un tour supplémentaire
    this.scoreCounts = scoreCounts; // Indique si le score doit être pris en compte dans les statistiques
  }
}

  