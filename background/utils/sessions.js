import { loadLocalDatas, saveLocalDatas } from './local-datas.js';
import { Session, Score } from '../../models/models.js';

// Génère un identifiant unique pour les sessions
function generateSessionId() {
  return new Date().getTime();
}

export async function startSession(playerNames) {
  const localDatas = await loadLocalDatas();

  // Sauvegarder la session actuelle dans les archives, si elle existe
  if (localDatas.actual_session) {
    localDatas.archives.push(localDatas.actual_session);
  }

  // Créer une nouvelle session avec les noms de joueurs fournis
  const newSession = new Session(generateSessionId(), new Date());
  newSession.player_names = playerNames;
  localDatas.actual_session = newSession;

  saveLocalDatas(localDatas);
}

export async function endSession() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.archives.push(localDatas.actual_session);
    localDatas.actual_session = null;
    saveLocalDatas(localDatas);
  }
}

export async function updateSession(updatedSession) {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.actual_session = updatedSession;
    saveLocalDatas(localDatas);
  }
}

export async function addSessionScore(playerName, value, date) {
  const localDatas = await loadLocalDatas();
  const newScore = new Score(playerName, value, date);

  if (localDatas.actual_session) {
    localDatas.actual_session.scores.push(newScore);
    updateSession(localDatas.actual_session);
  }
}
