// La classe LocalDatas représente les données locales de l'application.
export class LocalDatas {
  players = []; // Liste des joueurs existants
  actual_session = null; // Session en cours, null si aucune session en cours
  archives = []; // Liste des sessions archivées
}

// La classe Session représente une session de jeu, avec une liste de joueurs et de scores.
export class Session {
  player_names = []; // Liste des noms des joueurs dans cette session
  scores = []; // Liste des scores dans cette session
  constructor(id, date) {
    this.id = id; // Identifiant unique de la session
    this.date = date; // Date de début de la session
  }
}

// La classe Player représente un joueur, avec son nom et les sessions auxquelles il a participé.
export class Player {
  name;
  session_ids = []; // Liste des identifiants de session auxquelles le joueur a participé
  constructor(name) {
    this.name = name; // Nom du joueur
  }
}

// La classe Score représente un score, avec le nom du joueur, la valeur du score et la date.
export class Score {
  constructor(playerName, value, date) {
    this.playerName = playerName; // Nom du joueur ayant obtenu ce score
    this.value = value; // Valeur du score
    this.date = date; // Date à laquelle le score a été obtenu
  }
}
