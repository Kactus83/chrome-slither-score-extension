import { loadLocalDatas } from './utils/local-datas.js';
import { registerPlayer } from './utils/player-service.js';

chrome.runtime.onInstalled.addListener(function() {
  loadLocalDatas();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_PLAYERS') {
    const localDatas = loadLocalDatas();
    sendResponse({ players: localDatas.players });
  } else if (request.type === 'GET_ALL_DATA') {
    const localDatas = loadLocalDatas();
    sendResponse(localDatas);
  } else if (request.type === 'REGISTER_PLAYER') {
    const playerName = request.playerName;
    const result = registerPlayer(playerName);
    sendResponse({ success: result });
  } else {
    sendResponse({ error: 'Invalid request type' });
  }
});
