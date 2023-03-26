import { sendRequest } from './send-request.js';

// GET DATAS request 

export function sendGetActualSession() {
    return sendRequest({ type: 'GET_ACTUAL_SESSION' });
}

export function sendGetAllPlayers() {
    return sendRequest({ type: 'GET_ALL_PLAYERS' });
}

export function sendGetActivePlayer() {
    return sendRequest({ type: 'GET_ACTIVE_PLAYER' });
}

export function sendGetPlayerNameAvailability(playerName) {
    return sendRequest({ type: 'GET_PLAYER_NAME_AVAILABILITY', playerName });
}

export function sendGetPlayerBestScore(playerName) {
    return sendRequest({ type: 'GET_PLAYER_BEST_SCORE', playerName });
}

export function sendGetSessionAverageScore() {
    return sendRequest({ type: 'GET_SESSION_AVERAGE_SCORE' });
}

export function sendGetNextPlayers() {
    return sendRequest({ type: 'GET_NEXT_PLAYERS' });
}

export function sendGetBestScoreRanking() {
    return sendRequest({ type: 'GET_BEST_SCORE_RANKING' });
}

export function sendGetAverageScoreRanking() {
    return sendRequest({ type: 'GET_AVERAGE_SCORE_RANKING' });
}

export function sendGetPlayerScoreCount(playerName) {
    return sendRequest({ type: 'GET_PLAYER_SCORE_COUNT', playerName });
}

export function sendGetPlayerTotalScore(playerName) {
    return sendRequest({ type: 'GET_PLAYER_TOTAL_SCORE', playerName });
}

export function sendGetTotalScores() {
    return sendRequest({ type: 'GET_TOTAL_SCORES' });
}

export function sendGetLastScore() {
    return sendRequest({ type: 'GET_LAST_SCORE' });
}