import eventNames from './eventNames.js';

const SELECTORS = {
  loginDiv: '#login',
  playButton: '#playh',
  lastScore: '#lastscore',
  victoryHolder: '#victory_holder',
};

function determineGameState() {
  const loginDiv = document.querySelector(SELECTORS.loginDiv);
  const playButton = document.querySelector(SELECTORS.playButton);
  const lastScore = document.querySelector(SELECTORS.lastScore);
  const victoryHolder = document.querySelector(SELECTORS.victoryHolder);

  if (loginDiv.style.display === 'none') {
    return 'IN_GAME';

  } else {

    if (!lastScore || lastScore.innerHTML.trim() === '&nbsp;' || lastScore.style.display === 'none') {
      return 'START';
    }

    if (lastScore && lastScore.innerHTML.trim() !== '&nbsp;' && lastScore.style.display != 'none') {
      return 'END';

    } else {
      console.error('Unable to determine game state');
      return null;
    }
  }
}

export function analyzePageAndDispatchEvents() {
  const gameState = determineGameState();
  console.log ("game state : ", gameState);

  if (gameState === 'START') {
    document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN));
  }
  if (gameState === 'IN_GAME') {
    document.dispatchEvent(new CustomEvent(eventNames.GameEvents.IN_PROGRESS));
  }
  if (gameState === 'END') {
    document.dispatchEvent(new CustomEvent(eventNames.GameEvents.GAME_OVER));
  }
}
