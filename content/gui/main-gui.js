import { InPlayComponent } from './modules/in-play/in-play.js';
import { ContinueSessionComponent } from './modules/continue-session/continue-session.js';
import { NewTurnDisplay } from './modules/new-turn/new-turn.js';
import { EndTurnDisplay } from './modules/end-turn/end-turn.js';
import { ErrorOverlay } from './modules/error/error-overlay.js';
import { Stats } from './modules/stats/stats.js';
import { LoadingOverlay } from './modules/loading/loading-overlay.js';
import { RegisterPlayerComponent } from './modules/register-player/register-player.js';
import { StartSessionComponent } from './modules/start-session/start-session.js';
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
    await this.registerPlayerComponent.init();
    await this.registerPlayerComponent.insert();
  }

  async showStartSessionForm() {
    this.startSessionComponent = new StartSessionComponent();
    await this.startSessionComponent.init();
    await this.startSessionComponent.insert();
  }

  async showLoadingScreen() {
    await this.stats.statsButton.remove();
    await this.loadingOverlay.insert();
  }

  async hideLoadingScreen() {
    await this.loadingOverlay.remove();
  }

  async showNewTurnScreen() {
    await this.stats.statsButton.render();
    this.newTurnDisplay = new NewTurnDisplay();
    await this.newTurnDisplay.init();
    await this.newTurnDisplay.insert();
  }

  async showEndTurnScreen() {
    this.endTurnDisplay = new EndTurnDisplay();
    await this.endTurnDisplay.init();
    await this.endTurnDisplay.insert();
  }

  async showInPlayScreen() {
    await this.stats.statsButton.remove();
    this.inPlayComponent = new InPlayComponent();
    await this.inPlayComponent.init();
    await this.inPlayComponent.insert();
  }

  async showContinueSessionScreen() {
    await this.stats.statsButton.remove();
    this.continueSessionComponent = new ContinueSessionComponent();
    await this.continueSessionComponent.init();
    await this.continueSessionComponent.insert();
  }

  async showErrorScreen() {
    this.stats.statsButton.remove();
    this.errorOverlay = new ErrorOverlay();
    await this.errorOverlay.init();
    await this.errorOverlay.insert();
  }
}
