import eventNames from '../../../events/eventNames.js';
import { sendGetLastScore } from '../../../messages/send-messages.js';

export class EndTurnDisplay {
  constructor() {
    this.overlay = null;
    this.eventTriggered = false;
    this.handleClick = this.handleClick.bind(this);
  }

  async init() {
    this.appendStylesheet();
    this.overlay = await this.createEndTurnDisplay();
    this.addEventListeners();
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/end-turn/end-turn.css');
    document.head.appendChild(link);
  }

  async createEndTurnDisplay() {
    const existingOverlay = document.querySelector('.end-turn-display');
    if (existingOverlay) {
      console.error('Error: End turn component already exists.');
      return null;
    }
  
    this.hideLastScore();
  
    const overlay = document.createElement('div');
    overlay.classList.add('end-turn-display');
  
    const response = await sendGetLastScore();
  
    const playerScore = document.createElement('div');
    playerScore.textContent = `Joueur: ${response.datas.lastScore.playerName}, Score: ${response.datas.lastScore.value}`;
    playerScore.classList.add('player-score');
  
    const extraTurn = document.createElement('div');
    extraTurn.textContent = `Extra turn: ${response.datas.lastScore.extraTurn ? 'Yes' : 'No'}`;
    extraTurn.classList.add('extra-turn');
  
    const overPlayed = document.createElement('div');
    overPlayed.textContent = `Over played: ${response.datas.lastScore.overPlayed ? 'Yes' : 'No'}`;
    overPlayed.classList.add('over-played');
  
    const countScore = document.createElement('div');
    countScore.textContent = `Count score: ${response.datas.lastScore.scoreCounts ? 'Yes' : 'No'}`;
    countScore.classList.add('count-score');
  
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
  
    infoContainer.appendChild(playerScore);
    infoContainer.appendChild(extraTurn);
    infoContainer.appendChild(overPlayed);
    infoContainer.appendChild(countScore);
  
    overlay.appendChild(infoContainer);
  
    return overlay;
  }

  hideLastScore() {
    const lastScore = document.querySelector('#lastscore');
    if (lastScore) {
      lastScore.style.display = 'none';
    }
  }

  addEventListeners() {
    this.overlay.addEventListener('click', this.handleClick);
    setTimeout(this.handleClick, 5000);
  }

  removeEventListeners() {
    this.overlay.removeEventListener('click', this.handleClick);
  }

  handleClick() {
    if (!this.eventTriggered) {
      this.eventTriggered = true;
      this.remove();
      console.log("****************** EVENT END TURN *******************");
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN));
    }
  }

  insert() {
    document.body.appendChild(this.overlay);
  }

  remove() {
    this.removeEventListeners();
    this.removeOverlay();
  }

  removeOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
}

export default EndTurnDisplay;
