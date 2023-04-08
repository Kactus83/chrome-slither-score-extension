import {
    startSession,
    endSession,
  } from '../../utils/sessions.js';
  import { registerPlayer } from '../../utils/player-service.js';
  import { loadLocalDatas } from '../../utils/local-datas.js';
  
  export async function handleUserActions(request) {
    const localDatas = await loadLocalDatas();
  
    switch (request.type) {
      case 'INIT_GAME_SESSION':
        await startSession(request.sessionParams);
        return { displayType: 'INIT_GAME_SESSION' };
  
      case 'RESUME_GAME_SESSION':
        return { displayType: 'IN_GAME', datas: localDatas.actual_session };
  
      case 'END_GAME_SESSION':
        await endSession();
        return { displayType: 'INIT_SESSION' };
  
      case 'SELECT_ACTIVE_PLAYER':
        return { displayType: 'SELECT_ACTIVE_PLAYER', datas: { selectedPlayerName: request.playerName } };
  
      case 'ADD_PLAYER_TO_DATAS':
        const playerName = request.playerName;
        const result = await registerPlayer(playerName);
        return { displayType: 'PLAYER_ADDED_TO_DATAS', datas: result.name };
  
      default:
        throw new Error('Unhandled request type in handleUserActions');
    }
  }
  