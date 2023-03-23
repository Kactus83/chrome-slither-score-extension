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
let activePlayerName = null;

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
        localDatas = await loadLocalDatas();
        isInGame = true;
        return { displayType: 'IN_GAME', datas: localDatas.actual_session };

      case 'LAUNCH_INIT_GAME_SESSION':
        localDatas = await loadLocalDatas();
        const players = localDatas.players;
        isInGame = false;
        return { displayType: 'INIT_SESSION', datas: players };

      case 'INIT_GAME_SESSION':
        const session = await startSession(request.playersNames);
        isInGame = true;
        localDatas = await loadLocalDatas();
        return { displayType: 'INIT_GAME_SESSION', datas: session };

      case 'WAIT_NEXT_TURN':
        localDatas = await loadLocalDatas();
        return { displayType: 'WAIT_NEXT_TURN', datas: localDatas.actual_session };

      case 'SELECT_ACTIVE_PLAYER':
        activePlayerName = request.playerName;
        return { displayType: 'SELECT_ACTIVE_PLAYER', datas: { selectedPlayerName: activePlayerName } };

      case 'IN_PROGRESS':
        activePlayerName = request.playerName;
        return { displayType: 'IN_PROGRESS', datas: { playerName: activePlayerName } };

      case 'GAME_OVER':
        const playerScore = request.playerScore;
        await addSessionScore(activePlayerName, playerScore, new Date());
        localDatas = await loadLocalDatas();
        return { displayType: 'GAME_OVER', datas: { playerScore } };

      case 'END_GAME_SESSION':
        await endSession();
        isInGame = false;
        localDatas = await loadLocalDatas();
        return { displayType: 'PAGE_VISITED', datas: { initialized: isInit } };

      case 'ADD_PLAYER_TO_DATAS':
        const playerName = request.playerName;
        const result = await registerPlayer(playerName);
        localDatas = await loadLocalDatas();
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
