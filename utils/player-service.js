import { Player } from '../models/models.js';
import { loadLocalDatas, saveLocalDatas } from './local-datas.js';


function checkPlayerNameAvailability(localDatas, playerName) {
    for (let i = 0; i < localDatas.players.length; i++) {
      if (localDatas.players[i].name === playerName) {
        return false;
      }
    }
    return true;
}

export function registerPlayer(playerName) {
    const localDatas = loadLocalDatas();
    if (checkPlayerNameAvailability(localDatas, playerName)) {
        const player = new Player(playerName);
        localDatas.players.push(player);
        saveLocalDatas(localDatas);
        return true;
    } else {
        return false;
    }
}
  