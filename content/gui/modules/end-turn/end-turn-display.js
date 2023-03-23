import eventNames from '../../../events/eventNames.js';

function hideLastScore() {
  const lastScore = document.querySelector('#lastscore');
  if (lastScore) {
    lastScore.style.display = 'none';
  }
}

export function createEndTurnDisplay(playerName, score) {
  // Vérifier si le composant existe déjà
  const existingOverlay = document.querySelector('.end-turn-display');
  if (existingOverlay) {
    console.error('Error: End turn component already exists.');
    return null;
  }
  // Importer et appliquer le fichier CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/modules/end-turn/end-turn-display.css');
  document.head.appendChild(link);

  hideLastScore();

  const overlay = document.createElement('div');
  overlay.classList.add('end-turn-display');

  const playerScore = document.createElement('div');
  playerScore.textContent = `Joueur: ${playerName}, Score: ${score}`;
  playerScore.classList.add('player-score');

  overlay.appendChild(playerScore);

  const handleClick = () => {
    removeEndTurnDisplay();
    document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN));
  };

  overlay.addEventListener('click', handleClick);

  setTimeout(handleClick, 5000);

  return overlay;
}

export function removeEndTurnDisplay() {
  const overlay = document.querySelector('.end-turn-display');
  if (overlay) {
    overlay.remove();
  }
}
