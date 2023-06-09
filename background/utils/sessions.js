import { loadLocalDatas, saveLocalDatas } from './local-datas.js';
import { Session, Score } from '../../models/models.js';

// Génère un identifiant unique pour les sessions
function generateSessionId() {
  return new Date().getTime();
}

export async function startSession(sessionParams) {
  const localDatas = await loadLocalDatas();

  // Sauvegarder la session actuelle dans les archives, si elle existe
  if (localDatas.actual_session) {
    localDatas.archives.push(localDatas.actual_session);
  }

  // Créer une nouvelle session avec les paramètres fournis
  const newSession = new Session(generateSessionId(), new Date(), sessionParams);
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

export async function addSessionScore(value, endDate) {
  const localDatas = await loadLocalDatas();
  const activePlayerId = localDatas.actual_session.current_score?.playerId;
  const activePlayerName = localDatas.actual_session.current_score?.playerName;
  
  if (!activePlayerId) {
    console.error("No active player to add score for.");
    return;
  }

  const newScore = new Score(activePlayerId, activePlayerName, value, localDatas.actual_session.current_score.startDate, endDate);

  if (localDatas.actual_session) {
    localDatas.actual_session.scores.push(newScore);
    await updateSession(localDatas.actual_session);
    console.log("score added : ");
    console.log(localDatas.actual_session);

    // Reset active score after adding the score
    await resetActiveScore();
  }
}

export async function setActiveScore(playerId, startDate) {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    const numericPlayerId = parseInt(playerId, 10);
    const activePlayer = localDatas.players.find(player => player.id === numericPlayerId);
    const playerName = activePlayer?.name;
    localDatas.actual_session.current_score = { playerId: numericPlayerId, playerName, startDate };
    await saveLocalDatas(localDatas);
  }
}

async function resetActiveScore() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    localDatas.actual_session.current_score = null;
    await saveLocalDatas(localDatas);
  }
}

export async function getActiveScore() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session) {
    return localDatas.actual_session.current_score;
  } else {
    return null;
  }
}

export async function getAllSessions() {
  const localDatas = await loadLocalDatas();
  const actualSession = localDatas.actual_session;
  const archivedSessions = localDatas.archives;

  const allSessions = [...archivedSessions];
  if (actualSession !== null) {
    allSessions.push(actualSession);
  }

  return allSessions;
}

export async function getActivePlayer() {
  const localDatas = await loadLocalDatas();

  if (localDatas.actual_session && localDatas.actual_session.current_score) {
    const activePlayerId = localDatas.actual_session.current_score.playerId;
    const activePlayer = localDatas.players.find(player => player.id === activePlayerId);
    return activePlayer;
  } else {
    return null;
  }
}

