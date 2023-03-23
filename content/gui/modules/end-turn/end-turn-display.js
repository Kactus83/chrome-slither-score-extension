import eventNames from '../../../events/eventNames.js';

function hideLastScore() {
  const lastScore = document.querySelector('#lastscore');
  if (lastScore) {
    lastScore.style.display = 'none';
  }
}

export function createEndTurnDisplay(playerName, score) {
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