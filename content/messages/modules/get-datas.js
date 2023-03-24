import { sendRequest } from './send-request.js';

// GET DATAS request 

export function sendGetPlayerNameAvailability(playerName) {
    return sendRequest({ type: 'GET_PLAYER_NAME_AVAILABILITY', playerName });
}

export function sendGetPlayerBestScore(playerName) {
    return sendRequest({ type: 'GET_PLAYER_BEST_SCORE', playerName });
}

export function sendGetSessionAverageScore() {
    return sendRequest({ type: 'GET_SESSION_AVERAGE_SCORE' });
}

export function sendGetNextPlayer() {
    return sendRequest({ type: 'GET_NEXT_PLAYER' });
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