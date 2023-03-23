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
    return 'END';

  } else {

    if (!lastScore || lastScore.style.display === 'none') {
      return 'START';
    }

    if (lastScore && lastScore.style.display != 'none') {
      return 'IN_GAME';

    }else{
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
    document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN));
  }
  if (gameState === 'END') {
    document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN));
  }
}

