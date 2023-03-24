import eventNames from '../../../events/eventNames.js';
import { sendGetLastScore } from '../../../messages/send-messages.js';

function hideLastScore() {
  const lastScore = document.querySelector('#lastscore');
  if (lastScore) {
    lastScore.style.display = 'none';
  }
}

export async function createEndTurnDisplay() {
  console.log("creating game over component");
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

  // Récupérer le dernier score
  const lastScore = await sendGetLastScore();

  const playerScore = document.createElement('div');
  playerScore.textContent = `Joueur: ${lastScore.datas.playerName}, Score: ${lastScore.datas.value}`;
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
