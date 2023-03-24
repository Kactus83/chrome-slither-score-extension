// GAME SATES REQUESTS

export function sendGameStatusWaitTurn() {
    return sendRequest({ type: 'WAIT_NEXT_TURN' });
  }
  
export function sendGameStatusInProgress(playerName) {
    return sendRequest({ type: 'IN_PROGRESS', playerName });
}
  
export function sendGameStatusGameOver(playerScore) {
    return sendRequest({ type: 'GAME_OVER', playerScore });
}