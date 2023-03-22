import {
  loadLocalDatas,
} from './utils/local-datas.js';
import {
  registerPlayer,
} from './utils/player-service.js';
import {
  startSession,
  endSession,
  updateSession,
  addSessionScore,
} from './utils/sessions.js';

let isInit = false;
let isInGame = false;
let localDatas = null;

const handleRequest = async (request, tabId) => {
  console.log('request received: ');
  console.log(request);
  try {
    switch (request.type) {
      case 'PAGE_VISITED':
        localDatas = await loadLocalDatas();
        isInit = true;
        return { displayType: 'PAGE_VISITED', datas: { initialized: isInit } };

      case 'PAGE_LOADED':
        if (!localDatas.players || localDatas.players.length === 0) {
          return { displayType: 'ADD_PLAYER_TO_DATAS', datas: 'first-add' };
        }
        if (isInGame) {
          return { displayType: 'IN_GAME', datas: {} };
        } else {
          const displayType = localDatas.actual_session ? 'RESUME_SESSION' : 'INIT_SESSION';
          const datas = localDatas.actual_session ? localDatas.actual_session : localDatas.players;
          return { displayType: displayType, datas: datas };
        }

      case 'RESUME_GAME_SESSION':
        isInGame = true;
        return { displayType: 'IN_GAME', datas: {} };

      case 'INIT_GAME_SESSION':
        await startSession(request.playerNames);
        localDatas = await loadLocalDatas();
        isInGame = true;
        return { displayType: 'INIT_GAME_SESSION', datas: localDatas.actual_session };

      case 'END_GAME_SESSION':
        await endSession();
        isInGame = false;
        return { displayType: 'PAGE_VISITED', datas: { initialized: isInit } };

      case 'ADD_PLAYER_TO_DATAS':
        const playerName = request.playerName;
        const result = await registerPlayer(playerName);
        return { displayType: 'ADD_PLAYER_TO_DATAS', datas: result.name };

      case 'LAUNCH_ADD_PLAYER_TO_DATAS':
        return { displayType: 'ADD_PLAYER_TO_DATAS', datas: 'first-add' };

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
