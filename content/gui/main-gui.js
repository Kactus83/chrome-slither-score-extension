import { sendGetAllData } from '../messages/messages.js';

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
    // Utilisez sendGetAllData pour envoyer la requête et attendre la réponse
    const response = await sendGetAllData();
    console.log(response);
    if (response && response.players) {
      return response;
    } else {
      console.error("Unexpected response:", response);
      return { players: [] }; // Retournez un objet vide avec un tableau de players vide comme solution temporaire
    }
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
