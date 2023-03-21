import { sendRegisterPlayer, onBackgroundMessage } from './messages/messages.js';

export function createPlayerForm(localDatas, playerSelect) {
  const playerForm = document.createElement('form');
  playerForm.id = 'playerForm';
  playerForm.style.display = localDatas.players.length === 0 ? 'block' : 'none';

  const playerNameInput = document.createElement('input');
  playerNameInput.type = 'text';
  playerNameInput.placeholder = 'Nom du joueur';
  playerForm.appendChild(playerNameInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Enregistrer';
  playerForm.appendChild(submitButton);

  playerForm.onsubmit = async (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
      // Utilisez sendRegisterPlayer pour envoyer la requête
      const registerPlayerPromise = sendRegisterPlayer(playerName);

      // Créez une nouvelle promesse pour écouter la réponse
      const responsePromise = new Promise((resolve) => {
        onBackgroundMessage((response) => {
          resolve(response);
        });
      });

      // Attendez la réponse
      await registerPlayerPromise;
      const response = await responsePromise;

      if (response.error) {
        console.error(response.error);
      } else if (response.success) {
        const option = document.createElement('option');
        option.value = playerName;
        option.text = playerName;
        playerSelect.add(option);
        playerSelect.value = playerName;
        playerNameInput.value = '';
        if (localDatas.players.length === 1) {
          playerForm.style.display = 'none';
        }
      } else {
        alert('Ce nom de joueur existe déjà.');
      }
    }
  };

  return playerForm;
}