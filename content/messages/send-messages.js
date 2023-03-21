import { onBackgroundMessage } from "./handle-messages";


function sendRequest(request) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(request, (response) => {
      onBackgroundMessage(response, resolve);
    });
  });
}

export function sendGetPlayers() {
  return sendRequest({ type: 'GET_PLAYERS' });
}

export function sendGetAllData() {
  return sendRequest({ type: 'GET_ALL_DATA' });
}

export function sendRegisterPlayer(playerName) {
  return sendRequest({ type: 'REGISTER_PLAYER', playerName });
}

export function sendStartSession(playerNames) {
  return sendRequest({ type: 'START_SESSION', playerNames });
}

export function sendEndSession() {
  return sendRequest({ type: 'END_SESSION' });
}

export function sendUpdateSession(updatedSession) {
  return sendRequest({ type: 'UPDATE_SESSION', updatedSession });
}

export function sendAddSessionScore(playerName, value, date) {
  return sendRequest({ type: 'ADD_SESSION_SCORE', playerName, value, date });
}
