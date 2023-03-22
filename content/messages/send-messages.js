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

export function sendPageVisited() {
  return sendRequest({ type: 'PAGE_VISITED' });
}

export function sendPageLoaded() {
  return sendRequest({ type: 'PAGE_LOADED' });
}

export function sendInitGameSession(playersNames) {
  return sendRequest({ type: 'INIT_GAME_SESSION', playersNames });
}

export function sendResumeGameSession() {
  return sendRequest({ type: 'RESUME_GAME_SESSION' });
}

export function sendEndGameSession() {
  return sendRequest({ type: 'END_GAME_SESSION' });
}

export function sendGameStatusWaitTurn(playersNames) {
  return sendRequest({ type: 'WAIT_NEXT_TURN', playersNames });
}

export function sendGameStatusInProgress(playerName) {
  return sendRequest({ type: 'IN_PROGRESS', playerName });
}

export function sendGameStatusGameOver(playerScore) {
  return sendRequest({ type: 'GAME_OVER', playerScore });
}

export function sendSelectedPlayer(playerName) {
  return sendRequest({ type: 'SELECT_ACTIVE_PLAYER', playerName });
}

export function sendAddPlayerToDatas(playerName) {
  return sendRequest({ type: 'ADD_PLAYER_TO_DATAS', playerName });
}

export function sendLaunchAddPlayerToDatas(playerName) {
  return sendRequest({ type: 'LAUNCH_ADD_PLAYER_TO_DATAS', playerName });
}
