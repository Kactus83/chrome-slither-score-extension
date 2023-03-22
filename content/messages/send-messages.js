import { onBackgroundMessage } from "./handle-messages.js";

async function sendRequest(request) {
  console.log("sending request : ");
  console.log(request);
  const { showLoadingScreen } = await import("../gui/main-gui.js");
  showLoadingScreen();
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

export function sendInitGameSession() {
  return sendRequest({ type: 'INIT_GAME_SESSION' });
}

export function sendResumeGameSession() {
  return sendRequest({ type: 'RESUME_GAME_SESSION' });
}

export function sendAddPlayerToDatas(playerName) {
  return sendRequest({ type: 'ADD_PLAYER_TO_DATAS', playerName });
}
