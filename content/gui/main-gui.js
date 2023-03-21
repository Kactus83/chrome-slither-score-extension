// Importez les fonctions nécessaires depuis messages.js
import { sendGetAllData, onBackgroundMessage } from './messages/messages.js';

async function replaceNickHolderWithForm() {
  const [
    { createPlayerSelect },
    { createPlayerForm },
    { createToggleFormButton },
  ] = await Promise.all([
    import('./components/player-select.js'),
    import('./components/player-form.js'),
    import('./components/toogle-form-button.js'),
  ]);

  // Charger les données locales en envoyant un message au script d'arrière-plan
  const getLocalDatas = async () => {
    // Utilisez sendGetAllData pour envoyer la requête
    const getAllDataPromise = sendGetAllData();

    // Créez une nouvelle promesse pour écouter la réponse
    const responsePromise = new Promise((resolve) => {
      onBackgroundMessage((response) => {
        console.log(response);
        if (response && response.players) {
          resolve(response);
        } else {
          console.error("Unexpected response:", response);
          resolve({ players: [] }); // Retournez un objet vide avec un tableau de players vide comme solution temporaire
        }
      });
    });

    // Attendez la réponse
    await getAllDataPromise;
    const localDatas = await responsePromise;
    return localDatas;
  };

  const localDatas = await getLocalDatas();
  const playerSelect = createPlayerSelect(localDatas);
  const nickHolder = document.getElementById('nick_holder');
  const parentElement = nickHolder.parentElement;

  parentElement.insertBefore(playerSelect, nickHolder);
  parentElement.removeChild(nickHolder);

  const playerForm = createPlayerForm(localDatas, playerSelect);
  const toggleFormButton = createToggleFormButton(playerForm);

  parentElement.appendChild(toggleFormButton);
  parentElement.appendChild(playerForm);
}

replaceNickHolderWithForm();
