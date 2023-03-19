import { loadLocalDatas } from './utils/local-datas.js';
import { registerPlayer } from './utils/player-service.js';

chrome.runtime.onInstalled.addListener(function() {
  loadLocalDatas();
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'REGISTER_PLAYER') {
    const playerName = request.playerName;
    const result = registerPlayer(playerName);
    sendResponse({ success: result });
  } else {
    sendResponse({ error: 'Invalid request type' });
  }
  return false; // Indique que la réponse est synchrone
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  try {
    const localDatas = await loadLocalDatas();

    if (request.type === 'GET_PLAYERS') {
      sendResponse({ players: localDatas.players });
    } else if (request.type === 'GET_ALL_DATA') {
      console.log('localDatas in background.js:', localDatas);
      sendResponse(localDatas);
    } else if (request.type === 'REGISTER_PLAYER') {
      const playerName = request.playerName;
      const result = registerPlayer(playerName);
      sendResponse({ success: result });
    } else {
      sendResponse({ error: 'Invalid request type' });
    }
  } catch (error) {
    console.error('Error in onMessage:', error);
    sendResponse({ error: error.message });
  }

  return true; // Indique que la réponse sera asynchrone.
});

