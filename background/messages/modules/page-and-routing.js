import { loadLocalDatas } from '../../utils/local-datas.js';

export async function handlePageAndRouting(request) {
  const localDatas = await loadLocalDatas();
  const isInit = true;
  const isInGame = false;

  switch (request.type) {
    case 'PAGE_VISITED':
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

    case 'LAUNCH_INIT_GAME_SESSION':
      const players = localDatas.players;
      return { displayType: 'INIT_SESSION', datas: players };

    case 'LAUNCH_ADD_PLAYER_TO_DATAS':
      return { displayType: 'ADD_PLAYER_TO_DATAS', datas: 'first-add' };

    default:
      throw new Error('Unhandled request type in handlePageAndRouting');
  }
}
