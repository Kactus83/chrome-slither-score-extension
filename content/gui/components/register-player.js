import eventNames from '../../events/eventNames.js';

export function createRegisterPlayerOverlay(playerAdded) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/components/register-player-overlay.css');
  document.head.appendChild(link);

  const overlay = document.createElement('div');
  overlay.id = 'register-player-overlay';
  overlay.classList.add('register-player-overlay');

  overlay.innerText = 'Register Player';

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.alignItems = 'center';
  form.style.marginTop = '20px';

  if (playerAdded) {
    const successMessage = document.createElement('div');
    successMessage.innerText = 'Player successfully added!';
    successMessage.classList.add('success-message');
    overlay.appendChild(successMessage);
  }

  const playerNameInput = document.createElement('input');
  playerNameInput.style.fontSize = '20px';
  playerNameInput.style.marginBottom = '10px';
  playerNameInput.setAttribute('type', 'text');
  playerNameInput.setAttribute('placeholder', 'Player name');
  form.appendChild(playerNameInput);

  const registerButton = document.createElement('button');
  registerButton.classList.add('register-button');
  registerButton.innerText = 'Register';
  form.appendChild(registerButton);

  if (playerAdded) {
    const resetButton = document.createElement('button');
    resetButton.classList.add('reset-button');
    resetButton.innerText = 'Reset';
    resetButton.addEventListener('click', () => {
      removeRegisterPlayerOverlay()
      document.dispatchEvent(new CustomEvent(eventNames.PageEvents.ARRIVED));            
      // Délai de 1 seconde avant d'envoyer l'événement Loaded
      const sendLoadedEvent = () => {
        const loadedEvent = new CustomEvent(eventNames.PageEvents.LOADED);
        document.dispatchEvent(loadedEvent);
      };
      setTimeout(sendLoadedEvent, 1000); 
    });
    overlay.appendChild(resetButton);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const playerName = playerNameInput.value.trim();

    if (playerName != "first-add") {
      const addUserEvent = new CustomEvent(eventNames.UserEvents.ADD_USER_TO_DATAS, {
        detail: playerName
      });

      document.dispatchEvent(addUserEvent);

      removeRegisterPlayerOverlay();
    }
  });

  overlay.appendChild(form);

  return overlay;
}

export function removeRegisterPlayerOverlay() {
  const overlay = document.getElementById('register-player-overlay');
  if (overlay) {
    overlay.parentElement.removeChild(overlay);
  }
}
