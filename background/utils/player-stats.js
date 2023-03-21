export class PlayerStats {
    player_name = '';
    player_age = 0;
    best_score = 0;
    average_score = 0;
    median_score = 0;
    total_points = 0;
}

export class PlayerStatsService {

    static getPlayerStatsFromDate(localDatas, playerId, date = null) {
        const player = localDatas.players.find(p => p.id === playerId);
        if (!player) {
            return null;
        }

        const playerStats = new PlayerStats();
        playerStats.player_name = player.name;

        let sessionIds = player.session_ids;
        if (date) {
            const cutoffTime = new Date(date).getTime();
            sessionIds = sessionIds.filter(sessionId => {
                const sessionDate = new Date(localDatas.archives.find(a => a.id === sessionId).date).getTime();
                return sessionDate >= cutoffTime;
            });
        }

        const scores = sessionIds.flatMap(sessionId => {
            const session = localDatas.archives.find(a => a.id === sessionId);
            return session.scores.filter(s => s.playerName === player.name);
        }).map(s => s.value);

        if (scores.length === 0) {
            return null;
        }

        playerStats.best_score = Math.max(...scores);
        playerStats.total_points = scores.reduce((a, b) => a + b, 0);
        playerStats.average_score = playerStats.total_points / scores.length;

        scores.sort((a, b) => a - b);
        const mid = Math.floor(scores.length / 2);
        if (scores.length % 2 === 0) {
            playerStats.median_score = (scores[mid - 1] + scores[mid]) / 2;
        } else {
            playerStats.median_score = scores[mid];
        }

        const sessionDates = sessionIds.map(sessionId => {
            const session = localDatas.archives.find(a => a.id === sessionId);
            return new Date(session.date).getTime();
        });

        if (sessionDates.length > 0) {
            const maxSessionDate = Math.max(...sessionDates);
            playerStats.player_age = Math.floor((new Date().getTime() - maxSessionDate) / (365.25 * 24 * 60 * 60 * 1000));
        }

        return playerStats;
    }

    static getPlayerStatsOfSession(localDatas, playerId, sessionId) {
        const playerStats = new PlayerStats();
      
        const player = localDatas.players.find(p => p.id === playerId);
        if (!player) {
          return null;
        }
      
        const session = localDatas.archives.find(a => a.id === sessionId);
        if (!session) {
          return null;
        }
      
        playerStats.player_name = player.name;
      
        const playerScores = session.scores.filter(s => s.playerName === player.name).map(s => s.value);
      
        if (playerScores.length === 0) {
          return null;
        }
      
        playerStats.best_score = Math.max(...playerScores);
        playerStats.total_points = playerScores.reduce((a, b) => a + b, 0);
        playerStats.average_score = playerStats.total_points / playerScores.length;
      
        playerScores.sort((a, b) => a - b);
        const mid = Math.floor(playerScores.length / 2);
        if (playerScores.length % 2 === 0) {
          playerStats.median_score = (playerScores[mid - 1] + playerScores[mid]) / 2;
        } else {
          playerStats.median_score = playerScores[mid];
        }
      
        const sessionDate = new Date(session.date).getTime();
        const maxSessionDate = Math.max(...player.session_ids.map(sid => {
          const s = localDatas.archives.find(a => a.id === sid);
          return new Date(s.date).getTime();
        }));
        playerStats.player_age = Math.floor((sessionDate - maxSessionDate) / (365.25 * 24 * 60 * 60 * 1000));
      
        return playerStats;
      }

      static getMultiPlayersStatsFromDate(localDatas, playerIds, date = null) {
        const playerStatsArray = [];
        playerIds.forEach(playerId => {
            const playerStats = this.getPlayerStatsFromDate(localDatas, playerId, date);
            if (playerStats) {
                playerStatsArray.push(playerStats);
            }
        });
        return playerStatsArray;
    }

    static getMultiPlayersStatsOfSession(localDatas, playerIds, sessionId) {
        const playerStatsArray = [];
        playerIds.forEach(playerId => {
            const playerStats = this.getPlayerStatsOfSession(localDatas, playerId, sessionId);
            if (playerStats) {
                playerStatsArray.push(playerStats);
            }
        });
        return playerStatsArray;
    }
      
}
