// content-script.js
function createAddPlayerForm() {
  const form = document.createElement('form');
  form.id = 'add-player-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'name';
  input.placeholder = 'Nom du joueur';
  form.appendChild(input);

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Ajouter';
  form.appendChild(button);

  return form;
}

function replaceNickHolderWithForm() {
  const nickHolder = document.getElementById('nick_holder');

  if (!nickHolder) {
    setTimeout(replaceNickHolderWithForm, 1000);
    return;
  }

  const addPlayerForm = createAddPlayerForm();
  nickHolder.replaceWith(addPlayerForm);

  addPlayerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Le formulaire a été soumis !');
  });
}

window.addEventListener('load', replaceNickHolderWithForm);
