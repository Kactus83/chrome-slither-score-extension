import eventNames from '../../../../events/eventNames.js';
import { removeNewTurnDisplay } from '../new-turn-display.js';
import {
  getPlayerSelectValue
} from './player-select.js';


export function observeLoginDiv() {
  const loginDiv = document.querySelector('#login');
  if (!loginDiv) return;

  let inProgressTriggered = false;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!inProgressTriggered && mutation.type === 'attributes' && mutation.attributeName === 'style' && loginDiv.style.display === 'none') {
        const selectedPlayerName = getPlayerSelectValue();
        observer.disconnect();
        removeNewTurnDisplay(observer);
        const event = new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: selectedPlayerName });        
        document.dispatchEvent(event);
        inProgressTriggered = true;
      }
    });
  });

  const config = { attributes: true };
  observer.observe(loginDiv, config);

  return observer; // Retournez l'observateur ici
}



export function stopLoginDivObserver(observer) {
  if (observer) {
    observer.disconnect();
  }
}
