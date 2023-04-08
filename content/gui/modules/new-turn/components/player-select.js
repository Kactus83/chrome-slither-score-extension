import eventNames from '../../../../events/eventNames.js';
import {
  sendGetNextPlayers
} from "../../../../messages/send-messages.js";

export class PlayerSelectComponent {
  constructor() {
    this.playerSelectContainer = null;
    this.playerSelectHandler = null;
  }

  async init() {
    this.appendStylesheet();
    const playerNames = await this.fetchNextPlayers();
    this.playerSelectContainer = this.createPlayerSelectContainer(playerNames);
    this.playerSelectHandler = this.handlePlayerSelectChange.bind(this);
    this.addEventListeners();
  }

  async fetchNextPlayers() {
    const response = await sendGetNextPlayers();
    return response.datas.nextPlayers;
  }

  createPlayerSelectContainer(players) {
    const playerSelectContainer = document.createElement('div');
    playerSelectContainer.classList.add('player-select-container');
  
    const playerSelectLabel = document.createElement('span');
    playerSelectLabel.textContent = 'Joueur suivant : ';
    playerSelectLabel.classList.add('player-select-label');
    playerSelectContainer.appendChild(playerSelectLabel);
  
    const playerSelect = document.createElement('select');
    playerSelect.classList.add('player-select');
  
    players.forEach(player => {
      const option = document.createElement('option');
      option.value = player.id; 
      option.textContent = player.name; 
      playerSelect.appendChild(option);
    });
  
    playerSelectContainer.appendChild(playerSelect);
  
    return playerSelectContainer;
  }

  handlePlayerSelectChange(event) {
    const selectedPlayerId = event.target.value; 
    const customEvent = new CustomEvent(eventNames.UserEvents.SELECT_ACTIVE_PLAYER, { detail: selectedPlayerId });
    document.dispatchEvent(customEvent);
  }

  addEventListeners() {
    const playerSelect = this.playerSelectContainer.querySelector('.player-select');
    playerSelect.addEventListener('change', this.playerSelectHandler);
  }

  removeEventListeners() {
    const playerSelect = this.playerSelectContainer.querySelector('.player-select');
    playerSelect.removeEventListener('change', this.playerSelectHandler);
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/new-turn/components/player-select.css');
    document.head.appendChild(link);
  }

  insert() {
    const tipsDiv = document.getElementById("tips");
    tipsDiv.style.display = 'none'; 
    tipsDiv.parentElement.insertBefore(this.playerSelectContainer, tipsDiv);
  }

  remove() {
    this.removeEventListeners();
    this.removePlayerSelectContainer();
  }

  removePlayerSelectContainer() {
    if (this.playerSelectContainer) {
      this.playerSelectContainer.remove();
      this.playerSelectContainer = null;
    }
  }

  getPlayerSelectValue() {
    const playerSelect = this.playerSelectContainer.querySelector('.player-select');
    if (playerSelect) {
      return playerSelect.value;
    }
    return null;
  }
}

export default PlayerSelectComponent;
