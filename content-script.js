const localDatas = chrome.extension.getBackgroundPage().loadLocalDatas();

var play_btn = document.querySelector('.nsi');

function addPlayer(name) {
    const player = new Player(name);
    localDatas.players.push(player);
    saveLocalDatas();
  }
  
function saveLocalDatas() {
    localStorage.setItem('localDatas', JSON.stringify(localDatas));
}
  

play_btn.addEventListener('click', function() {
    alert('Le bouton Jouer a été cliqué !');
  });
  