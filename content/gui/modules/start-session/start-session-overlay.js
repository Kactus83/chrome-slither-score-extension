export function createStartSessionOverlay(players) {

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/components/start-session-overlay.css');
  document.head.appendChild(link);

  const overlay = document.createElement('div');
  overlay.classList.add('start-session-overlay');

  const playerContainer = document.createElement('div');
  playerContainer.style.display = 'flex';
  playerContainer.style.flexWrap = 'wrap';
  playerContainer.style.marginBottom = '15px';

  players.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-select');
    playerDiv.setAttribute('data-player-name', player.name);
    playerDiv.textContent = player.name;

    playerDiv.addEventListener('click', () => {
      playerDiv.classList.toggle('selected-player');
    });

    playerContainer.appendChild(playerDiv);
  });

  const addUserButton = document.createElement('button');
  addUserButton.textContent = 'Add User';
  addUserButton.classList.add('add-user-button');

  addUserButton.addEventListener('click', () => {
    const event = new CustomEvent(eventNames.UserEvents.LAUNCH_ADD_USER_TO_DATAS);
    removeStartSessionOverlay()
    document.dispatchEvent(event);
  });

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Session';
  startButton.classList.add('start-session-button');

  startButton.addEventListener('click', () => {
    const selectedPlayerDivs = playerContainer.querySelectorAll('.selected-player');
    const selectedPlayers = Array.from(selectedPlayerDivs).map(div => div.getAttribute('data-player-name'));
    const event = new CustomEvent(eventNames.UserEvents.INIT_SESSION, { detail: selectedPlayers });
    removeStartSessionOverlay()
    document.dispatchEvent(event);
  });

  overlay.appendChild(playerContainer);
  overlay.appendChild(startButton);
  overlay.appendChild(addUserButton);

  return overlay;
}

export function removeStartSessionOverlay() {
  const overlay = document.querySelector('.start-session-overlay');
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }
}
