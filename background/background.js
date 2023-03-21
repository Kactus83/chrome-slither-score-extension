import { loadLocalDatas } from './utils/local-datas.js';
import { registerPlayer } from './utils/player-service.js';

chrome.runtime.onInstalled.addListener(function () {
  loadLocalDatas();
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Request received:', request);
  const tabId = sender.tab.id; // Récupérez l'ID de l'onglet à partir du sender

  try {
    const localDatas = await loadLocalDatas();

    if (request.type === 'GET_PLAYERS') {
      chrome.tabs.sendMessage(tabId, { processing: true });
      chrome.tabs.sendMessage(tabId, { processing: false, players: localDatas.players });
    } else if (request.type === 'GET_ALL_DATA') {
      console.log('localDatas in background.js:', localDatas);
      chrome.tabs.sendMessage(tabId, { processing: true });
      chrome.tabs.sendMessage(tabId, { processing: false, ...localDatas });
    } else if (request.type === 'REGISTER_PLAYER') {
      const playerName = request.playerName;
      chrome.tabs.sendMessage(tabId, { processing: true });
      const result = registerPlayer(playerName);
      chrome.tabs.sendMessage(tabId, { processing: false, success: result });
    } else {
      chrome.tabs.sendMessage(tabId, { processing: false, error: 'Invalid request type' });
    }
  } catch (error) {
    console.error('Error in onMessage:', error);
    chrome.tabs.sendMessage(tabId, { processing: false, error: error.message });
  }

  return true; // Indique que la réponse sera asynchrone.
});
