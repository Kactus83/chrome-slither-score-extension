import { LocalDatas, Player, Score } from './models.js';

function loadLocalDatas() {
  chrome.storage.local.get('localDatas', function(data) {
      let localDatas = data.localDatas;
      if (!localDatas) {
          localDatas = new LocalDatas();
          chrome.storage.local.set({localDatas: localDatas});
      }
      return localDatas;
  });
}

const localDatas = loadLocalDatas();

function addPlayer(name) {
    const player = new Player(name);
    localDatas.players.push(player);
    saveLocalDatas();
}

function saveLocalDatas() {
    chrome.storage.local.set({localDatas: localDatas});
}

// Création de l'élément de formulaire
const form = document.createElement('form');
form.id = 'add-player-form';

// Création du champ de texte pour le nom du joueur
const input = document.createElement('input');
input.type = 'text';
input.name = 'name';
input.placeholder = 'Nom du joueur';
form.appendChild(input);

// Création du bouton pour ajouter le joueur
const button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Ajouter';
form.appendChild(button);

// Récupération de la div cible
const playhDiv = document.getElementById('playh');

// Insertion du formulaire avant la div cible
playhDiv.parentNode.insertBefore(form, playhDiv);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = input.value.trim();
    if (name !== '') {
        addPlayer(name);
        input.value = '';
    }
});

const play_btn = document.querySelector('.nsi');

play_btn.addEventListener('click', function() {
    alert('Le bouton Jouer a été cliqué !');
});


loadLocalDatas();