export class GameStatsComponent {
  constructor() {
    this.container = null;
  }

  show(overlay) {
    this.container = document.createElement("div");
    this.container.classList.add("game-stats-container");
    overlay.appendChild(this.container);

    // Ajoutez ici le code pour afficher les statistiques du jeu.
  }

  remove() {
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
      this.container = null;
    }
  }
}
