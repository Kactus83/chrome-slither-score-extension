import { sendRequest } from './send-request.js';

// USER ACTION REQUEST

export function sendInitGameSession(playersNames) {
    return sendRequest({ type: 'INIT_GAME_SESSION', playersNames });
  }

export function sendResumeGameSession() {
    return sendRequest({ type: 'RESUME_GAME_SESSION' });
}

export function sendEndGameSession() {
    return sendRequest({ type: 'END_GAME_SESSION' });
}

export function sendSelectedPlayer(playerName) {
    return sendRequest({ type: 'SELECT_ACTIVE_PLAYER', playerName });
}

export function sendAddPlayerToDatas(playerName) {
    return sendRequest({ type: 'ADD_PLAYER_TO_DATAS', playerName });
}