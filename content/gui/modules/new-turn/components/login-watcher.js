import eventNames from '../../../../events/eventNames.js';
import { removeNewTurnDisplay } from '../new-turn-display.js';

export function observeLoginDiv(playerSelect) {
  const loginDiv = document.querySelector('#login');
  if (!loginDiv) return;

  let inProgressTriggered = false;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!inProgressTriggered && mutation.type === 'attributes' && mutation.attributeName === 'style' && loginDiv.style.display === 'none') {
        const selectedPlayerName = playerSelect.value;
        observer.disconnect();
        const event = new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: selectedPlayerName });
        document.dispatchEvent(event);
        inProgressTriggered = true;
        removeNewTurnDisplay(); 
      }
    });
  });

  const config = { attributes: true };
  observer.observe(loginDiv, config);
}


export function stopLoginDivObserver(observer) {
  if (observer) {
    observer.disconnect();
  }
}
