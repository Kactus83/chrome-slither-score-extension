import { Player } from '../models.js';
import { PlayerStats } from './player-stats.js';
import { loadLocalDatas, saveLocalDatas } from './local-datas.js';

export class GameStatsService {


    constructor() {
        this.datas = loadLocalDatas();
    }

    updateDatas() {
        this.datas = loadLocalDatas();
    }

    getWholeStats(date = null) {
        const players = data.players;
        const playerStatsList = players.map(player => new PlayerStats(localDatas, player.session_ids, date));
        return playerStatsList;
    }

}
