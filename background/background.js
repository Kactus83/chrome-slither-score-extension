import {
  loadLocalDatas,
} from './utils/local-datas.js';
import {
  registerPlayer,
  preCheckPlayerNameAvailability
} from './utils/player-service.js';
import {
  startSession,
  endSession,
  updateSession,
  addSessionScore,
} from './utils/sessions.js';
import { SessionStatsService } from './utils/session-stats.js';

let isInit = false;
let isInGame = false;
let localDatas = null;
let activePlayerName = null;

const handleRequest = async (request, tabId) => {
  console.log('request received: ');
  console.log(request);
  
  const sessionStatsService = new SessionStatsService();
  
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
        console.log("last core received : ");
        console.log(request.playerScore);
        await addSessionScore(activePlayerName, playerScore, new Date());
        localDatas = await loadLocalDatas();
        console.log("local datas state in background : ");
        console.log(localDatas);
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

      case 'GET_PLAYER_NAME_AVAILABILITY':
        const check = await preCheckPlayerNameAvailability(request.playerName);
        return { displayType: 'NONE', datas: { check } };

      case 'GET_PLAYER_BEST_SCORE':
        const playerBestScore = await sessionStatsService.getPlayerBestScore(request.playerName);
        return { displayType: 'NONE', datas: { playerBestScore } };
      
      case 'GET_SESSION_AVERAGE_SCORE':
        const sessionAverageScore = await sessionStatsService.getSessionAverageScore();
        return { displayType: 'NONE', datas: { sessionAverageScore } };
      
      case 'GET_NEXT_PLAYER':
        const nextPlayer = await sessionStatsService.getNextPlayer();
        return { displayType: 'NONE', datas: { nextPlayer } };
        
      case 'GET_LAST_SCORE':
        const lastScore = await sessionStatsService.getLastScore();
        console.log("last score response : ");
        console.log(lastScore);
        return { displayType: 'NONE', datas: { lastScore } };

      
      case 'GET_BEST_SCORE_RANKING':
        const bestScoreRanking = await sessionStatsService.getBestScoreRanking();
        return { displayType: 'NONE', datas: { bestScoreRanking } };
      
      case 'GET_AVERAGE_SCORE_RANKING':
        const averageScoreRanking = await sessionStatsService.getAverageScoreRanking();
        return { displayType: 'NONE', datas: { averageScoreRanking } };
      
      case 'GET_PLAYER_SCORE_COUNT':
        const playerScoreCount = await sessionStatsService.getPlayerScoreCount(request.playerName);
        return { displayType: 'NONE', datas: { playerScoreCount } };
      
      case 'GET_PLAYER_TOTAL_SCORE':
        const playerTotalScore = await sessionStatsService.getPlayerTotalScore(request.playerName);
        return { displayType: 'NONE', datas: { playerTotalScore } };
      
      case 'GET_TOTAL_SCORES':
        const totalScores = await sessionStatsService.getTotalScores();
        return { displayType: 'NONE', datas: { totalScores } };
        
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

chrome.runtime.onInstalled.addListener(async function () {
  await loadLocalDatas();
});
