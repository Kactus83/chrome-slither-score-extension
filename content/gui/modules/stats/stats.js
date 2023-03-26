import { StatsButton, CloseButton, ButtonsContainer, BackButton } from './main-components.js';
import { GameStatsComponent } from './game.js';
import { PlayersStatsComponent } from './players.js';
import { SessionsStatsComponent } from './sessions.js';

export class Stats {
  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('stats-overlay');
    this.overlay.style.display = 'none';

    this.statsButton = new StatsButton();
    this.closeButton = new CloseButton();
    this.buttonsContainer = new ButtonsContainer();
    this.backButton = new BackButton();

    this.gameStatsComponent = new GameStatsComponent();
    this.playersStatsComponent = new PlayersStatsComponent();
    this.sessionsStatsComponent = new SessionsStatsComponent();

    this.currentComponent = null;

    document.addEventListener('initStatsOverlay', this.show.bind(this));
    document.addEventListener('closeStatsOverlay', this.hide.bind(this));
    document.addEventListener('setStatsOverlay', this.handleButtonClick.bind(this));
    document.addEventListener('backToSelection', this.handleBackClick.bind(this));
  }

  show() {
    this.overlay.style.display = 'block';
    this.statsButton.hide();
    this.closeButton.render(this.overlay);
    this.buttonsContainer.render(this.overlay);
  }

  hide() {
    this.overlay.style.display = 'none';
    this.statsButton.show();
    this.closeButton.remove();
    this.buttonsContainer.hide();
    this.backButton.remove();

    if (this.currentComponent) {
      this.currentComponent.remove();
      this.currentComponent = null;
    }
  }

  handleButtonClick(event) {
    const displayMode = event.detail;
    this.buttonsContainer.hide();
    this.backButton.render(this.overlay);

    switch (displayMode) {
      case 'game':
        this.currentComponent = this.gameStatsComponent;
        break;
      case 'players':
        this.currentComponent = this.playersStatsComponent;
        break;
      case 'sessions':
        this.currentComponent = this.sessionsStatsComponent;
        break;
      default:
        console.error('Invalid display mode:', displayMode);
        return;
    }

    this.currentComponent.show(this.overlay);
  }

  handleBackClick() {
    this.currentComponent.remove();
    this.currentComponent = null;
    this.backButton.hide();
    this.buttonsContainer.show();
  }

  remove() {
    document.removeEventListener('initStatsOverlay', this.show.bind(this));
    document.removeEventListener('closeStatsOverlay', this.hide.bind(this));
    document.removeEventListener('setStatsOverlay', this.handleButtonClick.bind(this));
    document.removeEventListener('backToSelection', this.handleBackClick.bind(this));

    this.statsButton.remove();
    this.closeButton.remove();
    this.buttonsContainer.remove();
    this.backButton.remove();

    if (this.currentComponent) {
      this.currentComponent.remove();
      this.currentComponent = null;
    }
  }
}
