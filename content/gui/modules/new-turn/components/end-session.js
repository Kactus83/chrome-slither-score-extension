import { EndSessionRankingComponent } from "./end-session-ranking.js";

export class EndSessionComponent {
  constructor() {
    this.overlay = null;
    this.closeButton = null;
    this.confirmButton = null;
    this.endSessionButton = null;
    this.rankingComponent = new EndSessionRankingComponent();
    this.handleEndSessionButtonClick = this.handleEndSessionButtonClick.bind(this);
  }

  init() {
    this.appendStylesheet();
    this.overlay = this.createOverlay();
    this.closeButton = this.createCloseButton();
    this.confirmButton = this.createConfirmButton();
    this.endSessionButton = this.createEndSessionButton();
  }

  appendStylesheet() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL(
      "content/gui/modules/new-turn/components/end-session.css"
    );
    document.head.appendChild(link);
  }

  createOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    return overlay;
  }

  createCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      this.rankingComponent.hideRanking();
      this.overlay.remove();
    });
    return closeButton;
  }

  createConfirmButton() {
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.textContent = "Confirmer";
    confirmButton.addEventListener("click", () => {
      const event = new CustomEvent(eventNames.UserEvents.INIT_END_SESSION);
      document.dispatchEvent(event);
    });
    return confirmButton;
  }

  createEndSessionButton() {
    const endSessionButton = document.createElement("button");
    endSessionButton.classList.add("end-session-button");
    endSessionButton.textContent = "Terminer la session";
    endSessionButton.addEventListener("click", this.handleEndSessionButtonClick);
    return endSessionButton;
  }

  async handleEndSessionButtonClick() {
    document.body.appendChild(this.overlay);
    await this.rankingComponent.showRanking(this.overlay);
    this.overlay.appendChild(this.closeButton);
    this.overlay.appendChild(this.confirmButton);
  }

  insert() {
    const playhDiv = document.getElementById("playh");
    if (playhDiv) {
      playhDiv.appendChild(this.endSessionButton);
    }
  }

  remove() {
    this.endSessionButton.removeEventListener("click", this.handleEndSessionButtonClick);
    if (this.endSessionButton.parentElement) {
      this.endSessionButton.parentElement.removeChild(this.endSessionButton);
    }
    this.rankingComponent.remove(); 
  }
}

export default EndSessionComponent;
