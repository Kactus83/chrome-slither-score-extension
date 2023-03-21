export function createStartSessionOverlay(players) {
    const overlay = document.createElement('div');
    overlay.classList.add('start-session-overlay');
    // Ajoutez des styles CSS pour positionner l'overlay en plein écran avec un fond violet sombre
  
    const playerSelect = document.createElement('select');
    playerSelect.classList.add('player-select');
    // Ajoutez des styles CSS pour rendre le menu déroulant moderne
  
    players.forEach(player => {
      const option = document.createElement('option');
      option.value = player.name;
      option.textContent = player.name;
      playerSelect.appendChild(option);
    });
  
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Session';
    startButton.classList.add('start-session-button');
    // Ajoutez des styles CSS pour rendre le bouton vert clair et moderne
  
    startButton.addEventListener('click', () => {
      // Appel à la fonction pour démarrer la session avec les joueurs sélectionnés
    });
  
    overlay.appendChild(playerSelect);
    overlay.appendChild(startButton);
  
    return overlay;
  }
  