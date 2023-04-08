import { sendRequest } from './send-request.js';

// GAME SATES REQUESTS

export function sendGameStatusWaitTurn() {
    return sendRequest({ type: 'WAIT_NEXT_TURN' });
  }
  
export function sendGameStatusInProgress(playerId) {
    return sendRequest({ type: 'IN_PROGRESS', playerId });
}
  
export function sendGameStatusGameOver(playerScore) {
    return sendRequest({ type: 'GAME_OVER', playerScore });
}