import { SessionStatsService } from '../../utils/session-stats.js';
import { getActivePlayer } from '../../utils/sessions.js';
import { preCheckPlayerNameAvailability, getAllPlayers } from '../../utils/player-service.js';
import { loadLocalDatas } from '../../utils/local-datas.js';

export async function handleGetDatas(request) {
  const sessionStatsService = new SessionStatsService();

  switch (request.type) {
    case 'GET_ACTUAL_SESSION':
      const localDatas = await loadLocalDatas();
      const actual_session = localDatas.actual_session;
      return { displayType: 'NONE', datas: { actual_session } };

    case 'GET_ALL_PLAYERS':
      const players = await getAllPlayers();
      return { displayType: 'NONE', datas: { players } };

    case 'GET_ACTIVE_PLAYER':
      const activePlayer = await getActivePlayer();
      return { displayType: 'NONE', datas: { activePlayer } };

    case 'GET_PLAYER_NAME_AVAILABILITY':
      const check = await preCheckPlayerNameAvailability(request.playerName);
      return { displayType: 'NONE', datas: { check } };

    case 'GET_PLAYER_BEST_SCORE':
      const playerBestScore = await sessionStatsService.getPlayerBestScore(request.playerName);
      return { displayType: 'NONE', datas: { playerBestScore } };

    case 'GET_SESSION_AVERAGE_SCORE':
      const sessionAverageScore = await sessionStatsService.getSessionAverageScore();
      return { displayType: 'NONE', datas: { sessionAverageScore } };

    case 'GET_NEXT_PLAYERS':
      const nextPlayers = await sessionStatsService.getNextPlayers();
      return { displayType: 'NONE', datas: { nextPlayers } };

    case 'GET_LAST_SCORE':
      const lastScore = await sessionStatsService.getLastScore();
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
      throw new Error('Unhandled request type in handleGetDatas');
  }
}
