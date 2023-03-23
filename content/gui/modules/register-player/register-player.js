import eventNames from '../../../events/eventNames.js';
import { sendGetPlayerNameAvailability } from '../../../messages/send-messages.js';

export function createRegisterPlayerOverlay(playerAdded) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/modules/register-player/register-player.css');
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
  registerButton.disabled = true; // Désactiver le bouton par défaut
  registerButton.classList.add('disabled-button'); // Ajouter la classe 'disabled-button' par défaut
  form.appendChild(registerButton);

  // Ajout d'un élément pour afficher les messages d'erreur
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  form.appendChild(errorMessage);

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

  // Fonction pour vérifier la disponibilité du pseudo
  const checkPlayerNameAvailability = async (playerName) => {
    const result = await sendGetPlayerNameAvailability(playerName);
    if (result.datas.check) {
      errorMessage.innerText = '';
      registerButton.disabled = false;
      registerButton.classList.remove('disabled-button');
      playerNameInput.classList.remove('invalid-input');
    } else {
      errorMessage.innerText = 'Username is already taken.';
      registerButton.disabled = true;
      registerButton.classList.add('disabled-button');
      playerNameInput.classList.add('invalid-input');
    }
  };

  playerNameInput.addEventListener('input', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
      checkPlayerNameAvailability(playerName);
    } else {
      errorMessage.innerText = '';
      registerButton.disabled = true;
      registerButton.classList.add('disabled-button');
      playerNameInput.classList.remove('invalid-input');
    }
  });

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
