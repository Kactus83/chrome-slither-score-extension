function createPlayerSelect(localDatas) {
  const select = document.createElement('select');
  select.id = 'playerSelect';

  if (localDatas.players.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.text = 'Aucun joueur enregistré';
    select.add(option);
  } else {
    localDatas.players.forEach(player => {
      const option = document.createElement('option');
      option.value = player.name;
      option.text = player.name;
      select.add(option);
    });
  }
  return select;
}

function togglePlayerForm() {
  const form = document.getElementById('playerForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function replaceNickHolderWithForm() {
  const [
    { registerPlayer },
    { loadLocalDatas }
  ] = await Promise.all([
    import('../utils/player-service.js'),
    import('../utils/local-datas.js')
  ]);

  const localDatas = await loadLocalDatas();
  const playerSelect = createPlayerSelect(localDatas);
  const nickHolder = document.getElementById('nick_holder');
  const parentElement = nickHolder.parentElement;

  // Remplacer nick_holder par playerSelect
  parentElement.insertBefore(playerSelect, nickHolder);
  parentElement.removeChild(nickHolder);

  // Ajouter un bouton pour afficher/masquer le formulaire d'ajout de joueur
  const toggleFormButton = document.createElement('button');
  toggleFormButton.textContent = 'Ajouter un joueur';
  toggleFormButton.onclick = togglePlayerForm;
  parentElement.appendChild(toggleFormButton);

  // Créer le formulaire d'ajout de joueur et le masquer si des joueurs sont enregistrés
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

  playerForm.onsubmit = (event) => {
    event.preventDefault();
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
      if (registerPlayer(playerName)) {
        const option = document.createElement('option');
        option.value = playerName;
        option.text = playerName;
        playerSelect.add(option);
        playerSelect.value = playerName;
        playerNameInput.value = '';
        if (localDatas.players.length === 1) {
          // Masquer le formulaire s'il y avait auparavant 0 joueur enregistré
          togglePlayerForm();
        }
      } else {
        alert('Ce nom de joueur existe déjà.');
      }
    }
  };

  parentElement.appendChild(playerForm);
}

replaceNickHolderWithForm();