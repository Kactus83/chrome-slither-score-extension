// PAGE EVENTS & ROUTING REQUEST

export function sendPageVisited() {
    return sendRequest({ type: 'PAGE_VISITED' });
  }
  
export function sendPageLoaded() {
    return sendRequest({ type: 'PAGE_LOADED' });
}

export function sendLaunchAddPlayerToDatas(playerName) {
    return sendRequest({ type: 'LAUNCH_ADD_PLAYER_TO_DATAS', playerName });
}

export function sendLaunchInitGameSession() {
    return sendRequest({ type: 'LAUNCH_INIT_GAME_SESSION' });
}