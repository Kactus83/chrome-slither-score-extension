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
    this.hideElementsAndResizeLogo();
    await this.registerPlayerComponent.init();
    await this.registerPlayerComponent.insert();
  }

  async showStartSessionForm() {
    this.hideElementsAndResizeLogo();
    this.startSessionComponent = new StartSessionComponent();
    await this.startSessionComponent.init();
    await this.startSessionComponent.insert();
  }

  async showLoadingScreen() {
    this.hideElementsAndResizeLogo();
    await this.stats.statsButton.remove();
    await this.loadingOverlay.insert();
  }

  async hideLoadingScreen() {
    await this.loadingOverlay.remove();
  }

  async showNewTurnScreen() {
    this.showElementsAndRestoreLogo();
    await this.stats.statsButton.render();
    this.newTurnDisplay = new NewTurnDisplay();
    await this.newTurnDisplay.init();
    await this.newTurnDisplay.insert();
  }

  async showEndTurnScreen() {
    this.hideElementsAndResizeLogo();
    this.endTurnDisplay = new EndTurnDisplay();
    await this.endTurnDisplay.init();
    await this.endTurnDisplay.insert();
  }

  async showInPlayScreen() {
    this.hideElementsAndResizeLogo();
    await this.stats.statsButton.remove();
    this.inPlayComponent = new InPlayComponent();
    await this.inPlayComponent.init();
    await this.inPlayComponent.insert();
  }

  async showContinueSessionScreen() {
    this.hideElementsAndResizeLogo();
    await this.stats.statsButton.remove();
    this.continueSessionComponent = new ContinueSessionComponent();
    await this.continueSessionComponent.init();
    await this.continueSessionComponent.insert();
  }

  async showErrorScreen() {
    this.hideElementsAndResizeLogo();
    await this.stats.statsButton.remove();
    this.errorOverlay = new ErrorOverlay();
    await this.errorOverlay.init();
    await this.errorOverlay.insert();
  }

  hideUselessElements() {
    const elementIds = ['grqh', 'fbh', 'twth', 'social-box'];
  
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
  
      if (element) {
        element.style.display = 'none';
      } else {
        console.warn(`Element with id "${id}" not found`);
      }
    });
  }
  
  hideElementsAndResizeLogo() {
    const elementIds = ['nick_holder', 'playh', 'cskh'];
    const logo = document.getElementById('logo');
    const overlay = document.querySelector('.continue-session-overlay');
  
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
  
      if (element) {
        element.style.display = 'none';
      } else {
        console.warn(`Element with id "${id}" not found`);
      }
    });
  
    if (logo) {
      logo.style.position = 'relative';
      logo.style.zIndex = '1000000'; // Assurez-vous que le zIndex est supérieur à celui de l'overlay
      logo.style.transform = 'scale(1.5, 1.5)';
    } else {
      console.warn('Logo element not found');
    }
  
    if (overlay) {
      overlay.style.zIndex = '999999';
    } else {
      console.warn('Overlay element not found');
    }
  }
  
  showElementsAndRestoreLogo() {
    const elementIds = ['nick_holder', 'playh', 'cskh'];
    const logo = document.getElementById('logo');
  
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
  
      if (element) {
        if (id === 'nick_holder') {
          element.style.display = 'inline-block';
        } else if (id === 'playh') {
          element.style.display = 'flex';
          element.style.justifyContent = 'center';
          element.style.flexDirection = 'column';
          element.style.alignItems = 'center';
        } else {
          element.style.display = 'block';
        }
      } else {
        console.warn(`Element with id "${id}" not found`);
      }
    });
  
    if (logo) {
      logo.style.position = 'static';
      logo.style.zIndex = '1';
      logo.style.transform = 'scale(1, 1)';
    } else {
      console.warn('Logo element not found');
    }
  }
}
