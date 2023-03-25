import eventNames from '../../../events/eventNames.js';
import { sendGetLastScore } from '../../../messages/send-messages.js';

let eventTriggered = false;

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
  const response = await sendGetLastScore();

  const playerScore = document.createElement('div');
  playerScore.textContent = `Joueur: ${response.datas.lastScore.playerName}, Score: ${response.datas.lastScore.value}`;
  playerScore.classList.add('player-score');

  overlay.appendChild(playerScore);
  
  const handleClick = () => {
    if (!eventTriggered) { // Vérifier si l'événement n'a pas déjà été déclenché
      eventTriggered = true; // Marquer l'événement comme déclenché
      removeEndTurnDisplay(overlay, handleClick); // Passer l'overlay et handleClick en arguments
      console.log("****************** EVENT END TURN *******************");
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN));
    }
  };

  overlay.addEventListener('click', handleClick);

  setTimeout(handleClick, 5000);

  return overlay;
}

export function removeEndTurnDisplay(overlay, handleClick) {
  if (overlay) {
    overlay.removeEventListener('click', handleClick); // Supprimer l'écouteur d'événement
    overlay.remove();
  }
}
