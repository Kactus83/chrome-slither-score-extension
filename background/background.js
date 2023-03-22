import { loadLocalDatas } from './utils/local-datas.js';
import { registerPlayer } from './utils/player-service.js';

let isInit = false;
let isInGame = false;
let localDatas = null;

const handleRequest = async (request, tabId) => {
  console.log("request received : ");
  console.log(request);
  try {
    switch (request.type) {
      case 'PAGE_VISITED':
        localDatas = await loadLocalDatas();
        isInit = true;
        return { displayType: 'PAGE_VISITED', datas: { initialized: isInit } };

      case 'PAGE_LOADED':
        const displayType = isInGame ? 'RESUME_SESSION' : 'INIT_SESSION';
        const datas = isInGame ? localDatas.actualSession : null;
        return { displayType: displayType, datas: datas };

      case 'INIT_GAME_SESSION':
        // La logique sera gérée plus tard avec un service du background
        return { displayType: 'INIT_GAME_SESSION', datas: {} };

      case 'RESUME_GAME_SESSION':
        // La logique sera gérée plus tard avec un service du background
        return { displayType: 'RESUME_GAME_SESSION', datas: {} };

      case 'ADD_PLAYER_TO_DATAS':
        const playerName = request.playerName;
        const result = registerPlayer(playerName);
        return { displayType: 'ADD_PLAYER_TO_DATAS', datas: { success: result } };

      default:
        throw new Error('Unhandled request type');
    }
  } catch (error) {
    console.error('Error in onMessage:', error);
    return { displayType: 'ERROR', datas: { error: error.message } };
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Request received:', request);
  const tabId = sender.tab.id;
  handleRequest(request, tabId).then(sendResponse);
  return true;
});

chrome.runtime.onInstalled.addListener(function () {
  loadLocalDatas();
});

