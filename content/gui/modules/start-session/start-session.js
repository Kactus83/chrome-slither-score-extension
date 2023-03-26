import eventNames from '../../../events/eventNames.js';
import { sendGetAllPlayers } from '../../../messages/send-messages.js';

export class StartSessionComponent {
  constructor() {
    this.players = [];
    this.overlay = null;
    this.playerContainer = null;
    this.addUserButton = null;
    this.startButton = null;
  }

  async init() {
    this.appendStylesheet();
    this.players = await this.fetchAllPlayers();
    this.createOverlay();
    this.createPlayerContainer();
    this.createAddUserButton();
    this.createStartButton();
  }

  async fetchAllPlayers() {
    const response = await sendGetAllPlayers();
    return response.datas.players;
  }

  insert() {
    this.overlay.appendChild(this.playerContainer);
    this.overlay.appendChild(this.startButton);
    this.overlay.appendChild(this.addUserButton);
    document.body.appendChild(this.overlay);
  }

  remove() {
    if (this.overlay) {
      this.overlay.parentNode.removeChild(this.overlay);
      this.overlay = null;
    }
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/start-session/start-session.css');
    document.head.appendChild(link);
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('start-session-overlay');
  }

  createPlayerContainer() {
    this.playerContainer = document.createElement('div');
    this.playerContainer.style.display = 'flex';
    this.playerContainer.style.flexWrap = 'wrap';
    this.playerContainer.style.marginBottom = '15px';

    this.players.forEach(player => {
      const playerDiv = document.createElement('div');
      playerDiv.classList.add('player-select');
      playerDiv.setAttribute('data-player-name', player.name);
      playerDiv.textContent = player.name;

      playerDiv.addEventListener('click', () => {
        playerDiv.classList.toggle('selected-player');
      });

      this.playerContainer.appendChild(playerDiv);
    });
  }

  createAddUserButton() {
    this.addUserButton = document.createElement('button');
    this.addUserButton.textContent = 'Add User';
    this.addUserButton.classList.add('add-user-button');

    this.addUserButton.addEventListener('click', () => {
      const event = new CustomEvent(eventNames.UserEvents.LAUNCH_ADD_USER_TO_DATAS);
      this.remove();
      document.dispatchEvent(event);
    });
  }

  createStartButton() {
    this.startButton = document.createElement('button');
    this.startButton.textContent = 'Start Session';
    this.startButton.classList.add('start-session-button');

    this.startButton.addEventListener('click', () => {
      const selectedPlayerDivs = this.playerContainer.querySelectorAll('.selected-player');
      const selectedPlayers = Array.from(selectedPlayerDivs).map(div => div.getAttribute('data-player-name'));
      console.log("selected players in component : ");
      console.log(selectedPlayers);
      const event = new CustomEvent(eventNames.UserEvents.INIT_SESSION, { detail: selectedPlayers });
      this.remove();
      document.dispatchEvent(event);
    });
  }
}
