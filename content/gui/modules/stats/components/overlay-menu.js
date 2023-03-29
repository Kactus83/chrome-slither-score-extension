export class OverlayMenu {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("overlay-menu");
    this.container.classList.add("buttons-container");

    const gameButton = this.createButton("Game Stats", "game");
    const playersButton = this.createButton("Players Stats", "players");
    const sessionsButton = this.createButton("Sessions Stats", "sessions");

    this.container.appendChild(gameButton);
    this.container.appendChild(playersButton);
    this.container.appendChild(sessionsButton);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  createButton(label, eventType) {
    const button = document.createElement("button");
    button.textContent = label;
    button.classList.add("generic-button");
    button.addEventListener("click", this.handleButtonClick);
    button.dataset.eventType = eventType;
    return button;
  }

  handleButtonClick(event) {
    const eventType = event.target.dataset.eventType;
    const customEvent = new CustomEvent("set-stats", {
      detail: { display: eventType },
    });
    document.dispatchEvent(customEvent);
  }  

  show(overlay) {
    overlay.appendChild(this.container);
  }

  remove() {
    if (this.container.parentElement) {
      const buttons = this.container.querySelectorAll(".generic-button");
      buttons.forEach(button => {
        button.removeEventListener("click", this.handleButtonClick);
      });
      this.container.parentElement.removeChild(this.container);
    }
  }
}

export class CloseButton {
  constructor() {
    this.button = document.createElement("button");
    this.button.classList.add("close-button");
    this.button.textContent = "X";
    this.handleClick = this.handleClick.bind(this);
  }

  render(parentElement) {
    parentElement.appendChild(this.button);
    this.button.addEventListener("click", this.handleClick);
  }

  remove() {
    if (this.button.parentElement) {
      this.button.removeEventListener("click", this.handleClick);
      this.button.parentElement.removeChild(this.button);
    }
  }

  handleClick() {
    const event = new CustomEvent(eventNames.UserEvents.CLOSE_STATS_OVERLAY);
    document.dispatchEvent(event);
  }
}

export class BackButton {
  constructor() {
    this.button = document.createElement("button");
    this.button.classList.add("back-button");
    this.button.textContent = "Back";
    this.handleClick = this.handleClick.bind(this);
  }

  render(parentElement) {
    parentElement.appendChild(this.button);
    this.button.addEventListener("click", this.handleClick);
  }

  remove() {
    if (this.button.parentElement) {
      this.button.removeEventListener("click", this.handleClick);
      this.button.parentElement.removeChild(this.button);
    }
  }

  handleClick() {
    const event = new CustomEvent("set-stats", {
      detail: { display: "menu" },
    });
    document.dispatchEvent(event);
  }  
}
