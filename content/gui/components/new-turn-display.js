import eventNames from '../../events/eventNames.js';

export function createNewTurnDisplay(players) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/components/new-turn-display.css');
  document.head.appendChild(link);

  const newTurnDiv = document.createElement('div');
  newTurnDiv.classList.add('new-turn-display');

  const playerSelect = document.createElement('select');
  playerSelect.classList.add('player-select');

  players.forEach(player => {
    const option = document.createElement('option');
    option.value = player.name;
    option.textContent = player.name;
    playerSelect.appendChild(option);
  });

  playerSelect.addEventListener('change', () => {
    const selectedPlayerName = playerSelect.value;
    const event = new CustomEvent(eventNames.UserEvents.SELECT_ACTIVE_PLAYER, { detail: selectedPlayerName });
    document.dispatchEvent(event);
  });

  newTurnDiv.appendChild(playerSelect);

  return newTurnDiv;
}

export function removeNewTurnDisplay() {
  const newTurnDiv = document.querySelector('.new-turn-display');
  if (newTurnDiv) {
    newTurnDiv.parentNode.removeChild(newTurnDiv);
  }
}
