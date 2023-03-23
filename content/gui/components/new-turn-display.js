import eventNames from '../../events/eventNames.js';

function observeLoginDiv(playerSelect) {
  const loginDiv = document.querySelector('#login');
  if (!loginDiv) return;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style' && loginDiv.style.display === 'none') {
        const selectedPlayerName = playerSelect.value;
        observer.disconnect();
        removeNewTurnDisplay()
        const event = new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: selectedPlayerName });
        document.dispatchEvent(event);
      }
    });
  });

  const config = { attributes: true };
  observer.observe(loginDiv, config);
}

function createPlayerSelect(player_names) {
  const playerSelect = document.createElement('select');
  playerSelect.classList.add('player-select');

  player_names.forEach(playerName => {
    const option = document.createElement('option');
    option.value = playerName;
    option.textContent = playerName;
    playerSelect.appendChild(option);
  });

  playerSelect.addEventListener('change', () => {
    const selectedPlayerName = playerSelect.value;
    const event = new CustomEvent(eventNames.UserEvents.SELECT_ACTIVE_PLAYER, { detail: selectedPlayerName });
    document.dispatchEvent(event);
  });

  return playerSelect;
}

function appendStylesheet() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/components/new-turn-display.css');
  document.head.appendChild(link);
}

export function createNewTurnDisplay(player_names) {
  appendStylesheet();

  const newTurnDiv = document.createElement('div');
  newTurnDiv.classList.add('new-turn-display');

  const playerSelect = createPlayerSelect(player_names);
  newTurnDiv.appendChild(playerSelect);

  observeLoginDiv(playerSelect);

  return newTurnDiv;
}

export function removeNewTurnDisplay() {
  const newTurnDiv = document.querySelector('.new-turn-display');
  if (newTurnDiv) {
    newTurnDiv.parentNode.removeChild(newTurnDiv);
  }
}
