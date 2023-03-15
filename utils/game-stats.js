import { Player } from '../models.js';
import { PlayerStatsService } from './player-stats.js';
import { loadLocalDatas, saveLocalDatas } from './local-datas.js';

export class GameStatsService {
    constructor() {
        this.datas = loadLocalDatas();
        this.playerStatsService = new PlayerStatsService();
    }

    updateDatas() {
        this.datas = loadLocalDatas();
        this.playerStatsService = new PlayerStatsService();
    }

    getWholeStats(date = null) {
        const players = this.datas.players.map(player => player.id);
        return this.playerStatsService.getMultiPlayersStatsFromDate(this.datas, players, date);
    }
}
