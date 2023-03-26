import eventNames from '../../../events/eventNames.js';
import { sendGetPlayerNameAvailability } from '../../../messages/send-messages.js';

export class RegisterPlayerComponent {
  constructor() {
    this.overlay = null;
    this.form = null;
    this.playerNameInput = null;
    this.registerButton = null;
    this.errorMessage = null;
    this.backButton = null;
    this.confirmationMessage = null;
  }

  init() {
    this.appendStylesheet();
    this.createOverlay();
    this.createForm();
    this.createPlayerNameInput();
    this.createRegisterButton();
    this.createErrorMessage();
    this.createBackButton();
    this.createConfirmationMessage();
  }

  insert() {
    this.overlay.appendChild(this.form);
    this.overlay.appendChild(this.backButton);
    document.body.appendChild(this.overlay);
  }

  remove() {
    if (this.overlay) {
      this.overlay.parentElement.removeChild(this.overlay);
      this.overlay = null;
    }
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/register-player/register-player.css');
    document.head.appendChild(link);
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'register-player-overlay';
    this.overlay.classList.add('register-player-overlay');
    this.overlay.innerText = 'Register Player';
  }

  createForm() {
    this.form = document.createElement('form');
    this.form.style.display = 'flex';
    this.form.style.flexDirection = 'column';
    this.form.style.alignItems = 'center';
    this.form.style.marginTop = '20px';
  }

  createPlayerNameInput() {
    this.playerNameInput = document.createElement('input');
    this.playerNameInput.style.fontSize = '20px';
    this.playerNameInput.style.marginBottom = '10px';
    this.playerNameInput.setAttribute('type', 'text');
    this.playerNameInput.setAttribute('placeholder', 'Player name');
    this.form.appendChild(this.playerNameInput);

    this.playerNameInput.addEventListener('input', () => {
      const playerName = this.playerNameInput.value.trim();
      if (playerName !== '') {
        this.checkPlayerNameAvailability(playerName);
      } else {
        this.errorMessage.innerText = '';
        this.registerButton.disabled = true;
        this.registerButton.classList.add('disabled-button');
        this.playerNameInput.classList.remove('invalid-input');
      }
    });
  }

  createRegisterButton() {
    this.registerButton = document.createElement('button');
    this.registerButton.classList.add('register-button');
    this.registerButton.innerText = 'Register';
    this.registerButton.disabled = true; // Désactiver le bouton par défaut
    this.registerButton.classList.add('disabled-button'); // Ajouter la classe 'disabled-button' par défaut
    this.form.appendChild(this.registerButton);

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const playerName = this.playerNameInput.value.trim();

      if (playerName != "first-add") {
        const addUserEvent = new CustomEvent(eventNames.UserEvents.ADD_USER_TO_DATAS, {
          detail: playerName
        });

        document.dispatchEvent(addUserEvent);

        this.remove();
      }
    });
  }

  createBackButton() {
    this.backButton = document.createElement('button');
    this.backButton.classList.add('back-button');
    this.backButton.innerText = 'Back';
    this.backButton.addEventListener('click', () => {
      this.remove();
      document.dispatchEvent(new CustomEvent(eventNames.PageEvents.ARRIVED));
      // Délai de 1 seconde avant d'envoyer l'événement Loaded
      const sendLoadedEvent = () => {
        const loadedEvent = new CustomEvent(eventNames.PageEvents.LOADED);
        document.dispatchEvent(loadedEvent);
      };
      setTimeout(sendLoadedEvent, 1000);
    });
  }

  createConfirmationMessage() {
    this.confirmationMessage = document.createElement('div');
    this.confirmationMessage.classList.add('confirmation-message');
    this.confirmationMessage.style.display = 'none';
    this.form.appendChild(this.confirmationMessage);
  }

  showConfirmationMessage(playerName) {
    this.confirmationMessage.innerText = `Player ${playerName} has been added successfully!`;
    this.confirmationMessage.style.display = 'block';
    this.playerNameInput.disabled = true;
    this.registerButton.disabled = true;
    this.registerButton.classList.add('disabled-button');
    this.errorMessage.style.display = 'none';
  }

  async checkPlayerNameAvailability(playerName) {
    const result = await sendGetPlayerNameAvailability(playerName);
    if (result.datas.check) {
      this.errorMessage.innerText = '';
      this.registerButton.disabled = false;
      this.registerButton.classList.remove('disabled-button');
      this.playerNameInput.classList.remove('invalid-input');
    } else {
      this.errorMessage.innerText = 'Username is already taken.';
      this.registerButton.disabled = true;
      this.registerButton.classList.add('disabled-button');
      this.playerNameInput.classList.add('invalid-input');
    }
  }
}

