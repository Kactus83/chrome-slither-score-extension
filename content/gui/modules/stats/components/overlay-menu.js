export class OverlayMenu {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("overlay-menu");

    const gameButton = this.createButton("Game Stats", "game");
    const playersButton = this.createButton("Players Stats", "players");
    const sessionsButton = this.createButton("Sessions Stats", "sessions");

    this.container.appendChild(gameButton);
    this.container.appendChild(playersButton);
    this.container.appendChild(sessionsButton);
  }

  createButton(label, eventType) {
    const button = document.createElement("button");
    button.textContent = label;
    button.classList.add("generic-button");
    button.addEventListener("click", () => {
      const event = new CustomEvent("set-stats", {
        detail: { display: eventType },
      });
      this.container.dispatchEvent(event);
    });
    return button;
  }

  show(overlay) {
    overlay.appendChild(this.container);
  }

  remove() {
    if (this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
    }
  }
}


export class CloseButton {
  constructor() {
    this.button = document.createElement("button");
    this.button.classList.add("close-button");
    this.button.textContent = "X";
  }

  render(parentElement) {
    parentElement.appendChild(this.button);

    this.button.addEventListener("click", () => {
      const event = new CustomEvent("set-stats", {
        detail: { display: "none" },
      });
      parentElement.dispatchEvent(event);
    });
  }

  remove() {
    if (this.button.parentElement) {
      this.button.parentElement.removeChild(this.button);
    }
  }
}

export class BackButton {
  constructor() {
    this.button = document.createElement("button");
    this.button.classList.add("back-button");
    this.button.textContent = "Back";
  }

  render(parentElement) {
    parentElement.appendChild(this.button);

    this.button.addEventListener("click", () => {
      const event = new CustomEvent("set-stats", {
        detail: { display: "menu" },
      });
      parentElement.dispatchEvent(event);
    });
  }

  remove() {
    if (this.button.parentElement) {
      this.button.parentElement.removeChild(this.button);
    }
  }
}
