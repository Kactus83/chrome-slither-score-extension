import { InPlayComponent } from './modules/in-play/in-play.js';
import { ContinueSessionComponent } from './modules/continue-session/continue-session.js';
import { NewTurnDisplay } from './modules/new-turn/new-turn.js';
import { EndTurnDisplay } from './modules/end-turn/end-turn.js';
import { ErrorOverlay } from './modules/error/error-overlay.js';
import { Stats } from './modules/stats/stats.js';
import { LoadingOverlay } from './modules/loading/loading-overlay.js';
import { RegisterPlayerComponent } from './modules/register-player/register-player.js';
import { StartSessionComponent } from './modules/start-session/start-session.js';
import { InPlayComponent } from './modules/in-play/in-play.js';

export class MainGUI {
  constructor() {
    this.inPlayComponent = null;
    this.continueSessionComponent = null;
    this.newTurnDisplay = null;
    this.endTurnDisplay = null;
    this.errorOverlay = null;
    this.stats = new Stats();
    this.loadingOverlay = new LoadingOverlay();
  }  
  
  async showRegisterPlayerOverlay(mode) {
    this.registerPlayerComponent = new RegisterPlayerComponent(mode);
    this.registerPlayerComponent.init();
    this.registerPlayerComponent.insert();
  }

  async showStartSessionForm(players) {
    this.startSessionComponent = new StartSessionComponent(players);
    this.startSessionComponent.init();
    this.startSessionComponent.insert();
  }

  async showLoadingScreen() {
    this.stats.statsButton.remove();
    this.loadingOverlay.insert();
  }

  async hideLoadingScreen() {
    this.loadingOverlay.remove();
  }

  async showNewTurnScreen() {
    this.stats.statsButton.render();
    this.newTurnDisplay = new NewTurnDisplay();
    await this.newTurnDisplay.init();
    this.newTurnDisplay.insert();
  }

  async showEndTurnScreen() {
    this.endTurnDisplay = new EndTurnDisplay();
    await this.endTurnDisplay.init();
    this.endTurnDisplay.insert();
  }

  async showInPlayScreen() {
    this.stats.statsButton.remove();
    this.inPlayComponent = new InPlayComponent();
    this.inPlayComponent.init();
    this.inPlayComponent.insert();
  }

  async showContinueSessionScreen() {
    this.stats.statsButton.remove();
    this.continueSessionComponent = new ContinueSessionComponent();
    this.continueSessionComponent.init();
    this.continueSessionComponent.insert();
  }

  async showErrorScreen() {
    this.stats.statsButton.remove();
    this.errorOverlay = new ErrorOverlay();
    this.errorOverlay.init();
    this.errorOverlay.insert();
  }
}
