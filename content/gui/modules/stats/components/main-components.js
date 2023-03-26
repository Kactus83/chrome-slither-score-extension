import eventNames from "../../../../events/eventNames.js";

export class StatsButton {
  constructor() {
    this.button = document.createElement('button');
    this.button.textContent = 'Stats';
    this.button.classList.add('stats-button');
    this.button.classList.add('main-stats-button');
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.INIT_STATS_OVERLAY));
  }

  render() {
    document.body.appendChild(this.button);
  }

  hide() {
    this.button.style.display = 'none';
  }

  show() {
    this.button.style.display = 'block';
  }

  remove() {
    this.button.removeEventListener('click', this.handleClick.bind(this));
    this.button.remove();
  }
}

export class CloseButton {
  constructor() {
    this.button = document.createElement('button');
    this.button.textContent = 'X';
    this.button.classList.add('close-button');
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.CLOSE_STATS_OVERLAY));
  }

  render(overlay) {
    overlay.appendChild(this.button);
  }

  hide() {
    this.button.style.display = 'none';
  }

  remove() {
    this.button.removeEventListener('click', this.handleClick.bind(this));
    this.button.remove();
  }
}

export class ButtonsContainer {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('buttons-container');

    const gameButton = this.createButton('Game Stats', 'game');
    const playersButton = this.createButton('Players Stats', 'players');
    const sessionsButton = this.createButton('Sessions Stats', 'sessions');

    this.container.appendChild(gameButton);
    this.container.appendChild(playersButton);
    this.container.appendChild(sessionsButton);
  }

  createButton(text, displayMode) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('stats-button');
    button.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent(eventNames.UserEvents.SET_STATS_OVERLAY, { detail: displayMode }));
    });
    return button;
  }

  render(overlay) {
    overlay.appendChild(this.container);
  }

  hide() {
    this.container.style.display = 'none';
  }

  show() {
    this.container.style.display = 'flex';
  }

  remove() {
    const buttons = this.container.querySelectorAll('.stats-button');
    buttons.forEach((button) => {
      button.removeEventListener('click', this.handleClick);
      button.remove();
    });
    this.container.remove();
  }
}

export class BackButton {
  constructor() {
    this.button = document.createElement('button');
    this.button.textContent = 'Back';
    this.button.classList.add('back-button');
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.BACK_TO_SELECTION));
  }

  render(overlay) {
    overlay.appendChild(this.button);
  }

  hide() {
    this.button.style.display = 'none';
  }

  show() {
    this.button.style.display = 'block';
  }

  remove() {
    if (this.button) {
      this.button.removeEventListener('click', this.handleClick.bind(this));
      this.button.remove();
      this.button = null;
    }
  }
}