import { Player } from '../../models/models.js';
import { loadLocalDatas, saveLocalDatas } from './local-datas.js';


async function checkPlayerNameAvailability(localDatas, playerName) {
  if(localDatas.players) {
    for (let i = 0; i < localDatas.players.length; i++) {
      if (localDatas.players[i].name === playerName) {
        return false;
      }
    }
  }
  return true;
}

export async function registerPlayer(playerName) {
    const localDatas = await loadLocalDatas();
    if (await checkPlayerNameAvailability(localDatas, playerName)) {
        const player = new Player(playerName);
        localDatas.players.push(player);
        saveLocalDatas(localDatas);
        return true;
    } else {
        return false;
    }
}
  