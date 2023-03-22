export function createStartSessionOverlay(players) {
  console.log(players);
  const overlay = document.createElement('div');
  overlay.classList.add('start-session-overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(50, 0, 100, 0.8)';
  overlay.style.zIndex = 9999;
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.flexDirection = 'column';

  const playerSelect = document.createElement('select');
  playerSelect.classList.add('player-select');
  playerSelect.style.fontSize = '16px';
  playerSelect.style.padding = '8px';
  playerSelect.style.borderRadius = '4px';
  playerSelect.style.border = '1px solid #444';

  players.forEach(player => {
    console.log(player);
    const option = document.createElement('option');
    option.value = player.name;
    option.textContent = player.name;
    playerSelect.appendChild(option);
  });

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Session';
  startButton.classList.add('start-session-button');
  startButton.style.fontSize = '18px';
  startButton.style.backgroundColor = '#2ecc71';
  startButton.style.color = '#fff';
  startButton.style.padding = '10px 20px';
  startButton.style.marginTop = '15px';
  startButton.style.border = 'none';
  startButton.style.borderRadius = '5px';
  startButton.style.cursor = 'pointer';

  startButton.addEventListener('click', () => {
    const selectedPlayer = playerSelect.value;
    const event = new CustomEvent(eventNames.UserEvents.START_SESSION, { detail: { player: selectedPlayer } });
    document.dispatchEvent(event);
  });

  overlay.appendChild(playerSelect);
  overlay.appendChild(startButton);

  return overlay;
}

export function removeStartSessionOverlay() {
  const overlay = document.querySelector('.start-session-overlay');
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }
}
  