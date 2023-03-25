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

  await saveLocalDatas(localDatas);

  return localDatas.actual_session;
}

export async function endSession() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.archives.push(localDatas.actual_session);
    localDatas.actual_session = null;
    await saveLocalDatas(localDatas);
  }
}

export async function updateSession(updatedSession) {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.actual_session = updatedSession;
    await saveLocalDatas(localDatas);
  }
}

export async function addSessionScore(value, date) {
  const localDatas = await loadLocalDatas();
  const activePlayerName = localDatas.actual_session.active_player;
  
  if (!activePlayerName) {
    console.error("No active player to add score for.");
    return;
  }

  const newScore = new Score(activePlayerName, value, date);

  if (localDatas.actual_session) {
    localDatas.actual_session.scores.push(newScore);
    await updateSession(localDatas.actual_session);
    console.log("score added : ");
    console.log(localDatas.actual_session);

    // Reset active player after adding the score
    await resetActivePlayer();
  }
}

export async function setActivePlayer(playerName) {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.actual_session.active_player = playerName;
    await saveLocalDatas(localDatas);
  }
}

async function resetActivePlayer() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.actual_session.active_player = null;
    await saveLocalDatas(localDatas);
  }
}

export async function getActivePlayer() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    return localDatas.actual_session.active_player;
  } else {
    return null;
  }
}
