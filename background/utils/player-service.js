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

export async function preCheckPlayerNameAvailability(playerName) {
  const localDatas = await loadLocalDatas();

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
        const registrationDate = new Date(); 
        const id = localDatas.players.length + 1; 
        const player = new Player(id, playerName, registrationDate);
        console.log(player);
        localDatas.players.push(player);
        await saveLocalDatas(localDatas);
        return player;
    } else {
        return false;
    }
}

export async function getAllPlayers() {
  const localDatas = await loadLocalDatas();
  return localDatas.players;
}
