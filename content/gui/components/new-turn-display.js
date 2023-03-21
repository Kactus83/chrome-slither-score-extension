export function createNewTurnDisplay(players) {
    const newTurnDiv = document.createElement('div');
    newTurnDiv.classList.add('new-turn-display');
    // Ajoutez des styles CSS pour positionner et styliser la div
  
    const playerSelect = document.createElement('select');
    playerSelect.classList.add('player-select');
    // Ajoutez des styles CSS pour rendre le menu déroulant moderne
  
    players.forEach(player => {
      const option = document.createElement('option');
      option.value = player.name;
      option.textContent = player.name;
      playerSelect.appendChild(option);
    });
  
    playerSelect.addEventListener('change', () => {
      // Appel à la fonction pour changer le joueur actif
    });
  
    newTurnDiv.appendChild(playerSelect);
  
    return newTurnDiv;
  }
  
  export function removeNewTurnDisplay() {
    const newTurnDiv = document.querySelector('.new-turn-display');
    if (newTurnDiv) {
      newTurnDiv.parentNode.removeChild(newTurnDiv);
    }
  }
  