import eventNames from '../../../../events/eventNames.js';

export function createPlayerSelect(player_names) {
  const playerSelectContainer = document.createElement('div');
  playerSelectContainer.classList.add('player-select-container');

  const playerSelectLabel = document.createElement('span');
  playerSelectLabel.textContent = 'Joueur suivant : ';
  playerSelectLabel.classList.add('player-select-label'); // Ajouter cette ligne
  playerSelectContainer.appendChild(playerSelectLabel);

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

  playerSelectContainer.appendChild(playerSelect);

  return playerSelectContainer;
}

export function getPlayerSelectValue() {
  const playerSelect = document.querySelector('.player-select');
  if (playerSelect) {
    return playerSelect.value;
  }
  return null;
}

export function removePlayerSelect() {
  const playerSelectContainer = document.querySelector('.player-select-container');
  if (playerSelectContainer) {
    playerSelectContainer.remove();
  }
}
