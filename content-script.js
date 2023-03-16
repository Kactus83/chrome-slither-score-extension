window.addEventListener('DOMContentLoaded', function() {
  // bouton play
  const play_btn = document.querySelector('.btnt.nsi.sadg1');;
  // Div du bouton play
  const playhDiv = document.getElementById('playh');

  // Elements du formulaire d'ajout de player
  let createAddPlayerForm, addPlayer;

  const guiUrl = chrome.runtime.getURL("gui/main-gui.js");
  fetch(guiUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, 'text/html');
      createAddPlayerForm = htmlDocument.querySelector('#add-player-form').cloneNode(true);
      addPlayer = createAddPlayerFunction(localDatas);
      const scoresTable = createScoresTable(localDatas);
      const chatbox = createChatbox(localDatas, playerName);
      addScoresUpdateListener(localDatas, scoresTable, chatbox);
      // Insertion du formulaire avant la div cible
      playhDiv.parentNode.insertBefore(createAddPlayerForm, playhDiv);
      form.addEventListener('submit', addPlayer);
      document.body.appendChild(scoresTable);
      document.body.appendChild(chatbox);

      play_btn.addEventListener('click', function() {
        alert('Le bouton Jouer a été cliqué !');
      });
    });

  playhDiv.addEventListener('click', function(event) {
  const clickedElement = event.target;
  console.log(clickedElement);
});

});
