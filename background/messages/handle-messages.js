import { handlePageAndRouting } from './modules/page-and-routing.js';
import { handleUserActions } from './modules/user-actions.js';
import { handleGameStates } from './modules/game-states.js';
import { handleGetDatas } from './modules/get-datas.js';

export async function handleMessage(request) {
  switch (request.type) {
    case 'PAGE_VISITED':
    case 'PAGE_LOADED':
    case 'LAUNCH_INIT_GAME_SESSION':
    case 'LAUNCH_ADD_PLAYER_TO_DATAS':
      return handlePageAndRouting(request);

    case 'INIT_GAME_SESSION':
    case 'RESUME_GAME_SESSION':
    case 'END_GAME_SESSION':
    case 'SELECT_ACTIVE_PLAYER':
    case 'ADD_PLAYER_TO_DATAS':
      return handleUserActions(request);

    case 'WAIT_NEXT_TURN':
    case 'IN_PROGRESS':
    case 'GAME_OVER':
      return handleGameStates(request);

    case 'GET_ACTUAL_SESSION':
    case 'GET_ALL_SESSIONS':
    case 'GET_ALL_PLAYERS':
    case 'GET_ACTIVE_PLAYER':
    case 'GET_PLAYER_NAME_AVAILABILITY':
    case 'GET_PLAYER_BEST_SCORE':
    case 'GET_SESSION_AVERAGE_SCORE':
    case 'GET_NEXT_PLAYERS':
    case 'GET_BEST_SCORE_RANKING':
    case 'GET_AVERAGE_SCORE_RANKING':
    case 'GET_PLAYER_SCORE_COUNT':
    case 'GET_PLAYER_TOTAL_SCORE':
    case 'GET_TOTAL_SCORES':
    case 'GET_LAST_SCORE':
      return handleGetDatas(request);

    default:
      throw new Error('Unhandled request type');
  }
}
