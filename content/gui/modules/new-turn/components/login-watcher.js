import eventNames from '../../../../events/eventNames.js';
import { removeNewTurnDisplay } from '../new-turn-display.js';
import {
  getPlayerSelectValue
} from './player-select.js';

export function observeLoginDiv() {
  const loginDiv = document.querySelector('#login');
  if (!loginDiv) return;

  let inProgressTriggered = false;
  let eventDispatched = false; // Ajoutez cette variable pour contrôler si l'événement a déjà été déclenché

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!inProgressTriggered && mutation.type === 'attributes' && mutation.attributeName === 'style' && loginDiv.style.display === 'none') {
        console.log("TRIGERRRRRR !!!!!");
        inProgressTriggered = true;
        const selectedPlayerName = getPlayerSelectValue();
        observer.disconnect();
        removeNewTurnDisplay(observer);
        if (!eventDispatched) { // Ajoutez cette condition pour éviter de déclencher l'événement plusieurs fois
          console.log("****************** EVENT NEW TURN *******************");
          const event = new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: selectedPlayerName });
          document.dispatchEvent(event);
          eventDispatched = true; // Mettez à jour l'état pour indiquer que l'événement a été déclenché
        }
      }
    });
  });

  const config = { attributes: true };
  observer.observe(loginDiv, config);

  return observer;
}

export function stopLoginDivObserver(observer) {
  if (observer) {
    observer.disconnect();
  }
}
