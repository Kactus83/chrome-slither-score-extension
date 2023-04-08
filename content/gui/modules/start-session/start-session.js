import eventNames from '../../../events/eventNames.js';
import { sendGetAllPlayers } from '../../../messages/send-messages.js';

export class StartSessionComponent {
  constructor() {
    this.players = [];
    this.overlay = null;
    this.playerContainer = null;
    this.addUserButton = null;
    this.startButton = null;
    this.difficultySelects = {};
    this.minScoreInput = null;
  }

  async init() {
    this.appendStylesheet();
    this.players = await this.fetchAllPlayers();
    this.createOverlay();
    this.createPlayerContainer();
    this.createAddUserButton();
    this.createStartButton();
    this.createMinScoreInput();
  }

  async fetchAllPlayers() {
    const response = await sendGetAllPlayers();
    return response.datas.players;
  }

  insert() {
    this.overlay.appendChild(this.playerContainer);
    this.overlay.appendChild(this.startButton);
    this.overlay.appendChild(this.addUserButton);
    this.overlay.appendChild(this.minScoreInput);
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

      const difficultySelect = document.createElement('select');
      ['facile', 'moyen', 'difficile'].forEach(difficulty => {
        const option = document.createElement('option');
        option.value = difficulty;
        option.textContent = difficulty;
        difficultySelect.appendChild(option);
      });
      this.difficultySelects[player.name] = difficultySelect;
      playerDiv.appendChild(difficultySelect);

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
      const selectedPlayers = Array.from(selectedPlayerDivs).map(div => {
        const playerName = div.getAttribute('data-player-name');
        const difficulty = this.difficultySelects[playerName].value;
        return { name: playerName, difficulty: difficulty };
      });
      console.log("selected players in component : ");
      console.log(selectedPlayers);
      const minScore = parseInt(this.minScoreInput.value, 10);
      const sessionParams = { players: selectedPlayers, minScore: minScore };
      const event = new CustomEvent(eventNames.UserEvents.INIT_SESSION, { detail: sessionParams });
      this.remove();
      document.dispatchEvent(event);
    });
  }

  createMinScoreInput() {
    this.minScoreInput = document.createElement('input');
    this.minScoreInput.setAttribute('type', 'number');
    this.minScoreInput.setAttribute('min', '0');
    this.minScoreInput.setAttribute('placeholder', 'Score minimum pour rejouer');
    this.minScoreInput.classList.add('min-score-input');
  }
}
