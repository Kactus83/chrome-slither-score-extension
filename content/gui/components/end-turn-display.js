export function createEndTurnDisplay(playerName, score) {
    const overlay = document.createElement('div');
    overlay.classList.add('end-turn-display');
    // Ajoutez des styles CSS pour positionner l'overlay en plein écran avec un fond violet sombre
  
    const playerScore = document.createElement('div');
    playerScore.textContent = `Player: ${playerName}, Score: ${score}`;
    playerScore.classList.add('player-score');
    // Ajoutez des styles CSS pour rendre le texte vert clair et moderne
  
    overlay.appendChild(playerScore);
  
    return overlay;
  }
  
  export function removeEndTurnDisplay() {
    const overlay = document.querySelector('.end-turn-display');
    if (overlay) {
      overlay.remove();
    }
  }
  