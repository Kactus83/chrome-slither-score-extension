import { OverlayMenu, CloseButton, BackButton } from "./overlay-menu.js";
import { GameStatsComponent } from "./game.js";
import { PlayersStatsComponent } from "./players.js";
import { SessionsStatsComponent } from "./sessions.js";

export class Overlay {
  constructor() {
    this.overlay = document.createElement("div");
    this.overlay.classList.add("stats-overlay");
    this.overlay.style.display = "none";

    this.closeButton = new CloseButton();
    this.backButton = new BackButton();
    this.menu = new OverlayMenu();

    this.overlay.addEventListener("set-stats", (event) => {
      this.handleSetStats(event.detail.display);
    });
  }

  show() {
    this.overlay.style.display = "block";
    this.showMenu();
  }

  hide() {
    this.overlay.style.display = "none";
    this.closeButton.remove();
    this.backButton.remove();
    this.menu.remove();
  }

  showMenu() {
    this.menu.show(this.overlay);
    this.closeButton.render(this.overlay);
    this.backButton.remove();
  }

  showComponent(component) {
    component.show(this.overlay);
    this.closeButton.render(this.overlay);
    this.backButton.render(this.overlay);
    this.menu.remove();
  }

  handleSetStats(display) {
    if (display === "none") {
      this.hide();
    } else if (display === "menu") {
      this.showMenu();
    } else {
      const componentsMap = {
        game: GameStatsComponent,
        players: PlayersStatsComponent,
        sessions: SessionsStatsComponent,
      };

      if (componentsMap[display]) {
        const component = new componentsMap[display]();
        this.showComponent(component);
      }
    }
  }

  remove() {
    this.hide();
    this.overlay.remove();
  }

  get element() {
    return this.overlay;
  }
}
