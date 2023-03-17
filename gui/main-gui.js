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
  const getLocalDatas = () => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_ALL_DATA' }, (response) => {
        resolve(response);
      });
    });
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
