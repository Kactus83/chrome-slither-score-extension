import { onBackgroundMessage } from "./handle-messages.js";

async function sendRequest(request) {
  console.log("sending request : ");
  console.log(request);
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(request, (response) => {
      onBackgroundMessage(response, () => {
        resolve(response);
      });
    });
  });
}

// PAGE EVENTS & ROUTING REQUEST

export function sendPageVisited() {
  return sendRequest({ type: 'PAGE_VISITED' });
}

export function sendPageLoaded() {
  return sendRequest({ type: 'PAGE_LOADED' });
}

export function sendLaunchAddPlayerToDatas(playerName) {
  return sendRequest({ type: 'LAUNCH_ADD_PLAYER_TO_DATAS', playerName });
}

export function sendLaunchInitGameSession() {
  return sendRequest({ type: 'LAUNCH_INIT_GAME_SESSION' });
}

// USER ACTION REQUEST

export function sendInitGameSession(playersNames) {
  return sendRequest({ type: 'INIT_GAME_SESSION', playersNames });
}

export function sendResumeGameSession() {
  return sendRequest({ type: 'RESUME_GAME_SESSION' });
}

export function sendEndGameSession() {
  return sendRequest({ type: 'END_GAME_SESSION' });
}

export function sendSelectedPlayer(playerName) {
  return sendRequest({ type: 'SELECT_ACTIVE_PLAYER', playerName });
}

export function sendAddPlayerToDatas(playerName) {
  return sendRequest({ type: 'ADD_PLAYER_TO_DATAS', playerName });
}

// GAME SATES REQUESTS

export function sendGameStatusWaitTurn() {
  return sendRequest({ type: 'WAIT_NEXT_TURN' });
}

export function sendGameStatusInProgress(playerName) {
  return sendRequest({ type: 'IN_PROGRESS', playerName });
}

export function sendGameStatusGameOver(playerScore) {
  return sendRequest({ type: 'GAME_OVER', playerScore });
}

// GET DATAS request 

export function sendGetPlayerNameAvailability(playerName) {
  return sendRequest({ type: 'GET_PLAYER_NAME_AVAILABILITY', playerName });
}

export function sendGetPlayerBestScore(playerName) {
  return sendRequest({ type: 'GET_PLAYER_BEST_SCORE', playerName });
}

export function sendGetSessionAverageScore() {
  return sendRequest({ type: 'GET_SESSION_AVERAGE_SCORE' });
}

export function sendGetNextPlayer() {
  return sendRequest({ type: 'GET_NEXT_PLAYER' });
}

export function sendGetBestScoreRanking() {
  return sendRequest({ type: 'GET_BEST_SCORE_RANKING' });
}

export function sendGetAverageScoreRanking() {
  return sendRequest({ type: 'GET_AVERAGE_SCORE_RANKING' });
}

export function sendGetPlayerScoreCount(playerName) {
  return sendRequest({ type: 'GET_PLAYER_SCORE_COUNT', playerName });
}

export function sendGetPlayerTotalScore(playerName) {
  return sendRequest({ type: 'GET_PLAYER_TOTAL_SCORE', playerName });
}

export function sendGetTotalScores() {
  return sendRequest({ type: 'GET_TOTAL_SCORES' });
}

export function sendGetLastScore() {
  return sendRequest({ type: 'GET_LAST_SCORE' });
}

