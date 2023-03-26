import { PlayerSelectComponent } from './components/player-select.js';
import { RankingComponent } from './components/ranking.js';
import { EndSessionComponent } from './components/end-session.js';
import { LoginDivObserver } from './utils/login-watcher.js';
import eventNames from '../../../events/eventNames.js';

export class NewTurnDisplay {
  constructor() {
    this.playerSelect = new PlayerSelectComponent();
    this.ranking = new RankingComponent();
    this.endSession = new EndSessionComponent();
    this.loginObserver = new LoginDivObserver();
  }

  init() {
    this.appendStylesheet();

    this.ranking.init();
    this.playerSelect.init();
    this.endSession.init();

    this.loginObserver.observe();

    document.addEventListener(eventNames.UserEvents.INIT_END_SESSION, this.handleInitEndSession.bind(this));
    document.addEventListener(eventNames.UserEvents.INIT_IN_PROGRESS, this.handleInitInProgress.bind(this));
  }
  
  insert() {
    this.ranking.insert();
    this.playerSelect.insert();
    this.endSession.insert();
  }
  

  remove() {
    this.ranking.remove();
    this.playerSelect.remove();
    this.endSession.remove();
    this.loginObserver.stop();

    document.removeEventListener(eventNames.UserEvents.INIT_END_SESSION, this.handleInitEndSession.bind(this));
    document.removeEventListener(eventNames.UserEvents.INIT_IN_PROGRESS, this.handleInitInProgress.bind(this));
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/new-turn/new-turn.css');
    document.head.appendChild(link);
  }

  handleInitEndSession() {
    this.remove();

    const event = new CustomEvent(eventNames.UserEvents.END_SESSION);
    document.dispatchEvent(event);
  }

  handleInitInProgress(event) {
    this.remove();

    const selectedPlayerName = event.detail;
    const inProgressEvent = new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: selectedPlayerName });
    document.dispatchEvent(inProgressEvent);
  }
}

export default NewTurnDisplay;
