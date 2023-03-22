import eventNames from '../../events/eventNames.js';

export function createRegisterPlayerOverlay(playerAdded) {
  const overlay = document.createElement('div');
  overlay.id = 'register-player-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = 'white';
  overlay.style.fontSize = '32px';
  overlay.innerText = 'Register Player';

  // Créer un formulaire pour l'enregistrement du joueur
  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.alignItems = 'center';
  form.style.marginTop = '20px';
  
  if (playerAdded) {
    const successMessage = document.createElement('div');
    successMessage.innerText = 'Player successfully added!';
    successMessage.style.marginBottom = '20px';
    successMessage.style.color = 'lime';
    overlay.appendChild(successMessage);
  }

  // Créer un champ de texte pour le nom du joueur
  const playerNameInput = document.createElement('input');
  playerNameInput.style.fontSize = '20px';
  playerNameInput.style.marginBottom = '10px';
  playerNameInput.setAttribute('type', 'text');
  playerNameInput.setAttribute('placeholder', 'Player name');
  form.appendChild(playerNameInput);

  // Créer un bouton "Register"
  const registerButton = document.createElement('button');
  registerButton.style.padding = '10px 20px';
  registerButton.style.fontSize = '20px';
  registerButton.style.cursor = 'pointer';
  registerButton.innerText = 'Register';
  form.appendChild(registerButton);
  
  if (playerAdded) {
    const resetButton = document.createElement('button');
    resetButton.style.padding = '10px 20px';
    resetButton.style.fontSize = '20px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.marginBottom = '10px';
    resetButton.innerText = 'Reset';
    resetButton.addEventListener('click', () => {
      removeRegisterPlayerOverlay()
      document.dispatchEvent(new CustomEvent(eventNames.PageEvents.ARRIVED));
    });
    overlay.appendChild(resetButton);
  }

  // Gérer la soumission du formulaire
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const playerName = playerNameInput.value.trim();

    if (playerName != "first-add") {
      // Générer un événement utilisateur avec le nom du joueur
      const addUserEvent = new CustomEvent(eventNames.UserEvents.ADD_USER_TO_DATAS, {
        detail: { playerName },
      });

      // Envoyer l'événement
      document.dispatchEvent(addUserEvent);

      // Supprimer l'overlay d'enregistrement du joueur
      removeRegisterPlayerOverlay();
    }
  });

  // Ajouter le formulaire à l'overlay d'enregistrement du joueur
  overlay.appendChild(form);

  return overlay;
}

export function removeRegisterPlayerOverlay() {
  const overlay = document.getElementById('register-player-overlay');
  if (overlay) {
    overlay.parentElement.removeChild(overlay);
  }
}
