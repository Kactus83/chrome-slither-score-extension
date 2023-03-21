export function sendGetPlayers() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_PLAYERS' }, (response) => {
        resolve(response);
      });
    });
}
  
export function sendGetAllData() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_ALL_DATA' }, (response) => {
        resolve(response);
      });
    });
}

export function sendRegisterPlayer(playerName) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'REGISTER_PLAYER', playerName }, (response) => {
        resolve(response);
      });
    });
}
  
export function onBackgroundMessage(callback) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      callback(request, sender, sendResponse);
    });
}