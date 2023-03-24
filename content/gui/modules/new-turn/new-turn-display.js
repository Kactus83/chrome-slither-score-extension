import { 
  createPlayerSelect, 
  removePlayerSelect 
} from './components/player-select.js';

import { 
  showRanking, 
  removeRanking 
} from './components/ranking.js';

import { 
  observeLoginDiv,
  stopLoginDivObserver
} from './components/login-watcher.js';

import {
  sendGetBestScoreRanking,
  sendGetNextPlayer,
  sendGetPlayerScoreCount,
} from "../../../messages/send-messages.js";

function appendStylesheet() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/modules/new-turn/new-turn-display.css');
  document.head.appendChild(link);
}

export async function createNewTurnDisplay() {
  const existingNewTurnDiv = document.querySelector(".new-turn-display");
  if (existingNewTurnDiv) {
    console.log("Removing existing new turn component.");
    existingNewTurnDiv.remove();
  }

  // Récupérez les noms des joueurs et le joueur suivant
  const playerData = await fetchPlayerData();

  appendStylesheet();

  const newTurnDiv = document.createElement("div");
  newTurnDiv.classList.add("new-turn-display");

  // Création et placement du composant ranking
  showRanking(playerData.bestScoreRanking);

  const tipsDiv = document.getElementById("tips");
  tipsDiv.style.display = 'none'; // Masquer la div "tips"

  // Création et placement du composant player-select
  const playerSelect = createPlayerSelect(playerData.playerOrder);

  // Insérer le composant de sélection des joueurs à la place de la div "tips"
  tipsDiv.parentElement.insertBefore(playerSelect, tipsDiv);

  // Observation de la div login
  const loginObserver = observeLoginDiv(playerSelect);

  console.log("new turn display created");

  return newTurnDiv;
}

export function removeNewTurnDisplay(loginObserver) {
  // Suppression du composant ranking
  removeRanking();

  // Suppression du composant player-select
  removePlayerSelect();

  // Arrête l'observateur de la div login
  stopLoginDivObserver(loginObserver);

  console.log("new turn display removed");
}


async function fetchPlayerData() {
  const _bestScoreRanking = await sendGetBestScoreRanking();
  const _nextPlayer = await sendGetNextPlayer();
  console.log(_bestScoreRanking);
  console.log(_nextPlayer);
  const bestScoreRanking = _bestScoreRanking.datas.bestScoreRanking;
  const nextPlayer = _nextPlayer.datas.nextPlayer;

  const otherPlayers = bestScoreRanking.filter(player => player.playerName !== nextPlayer);
  const otherPlayerNames = otherPlayers.map(player => player.playerName);

  const otherPlayerScoreCounts = await Promise.all(
    otherPlayerNames.map(async playerName => ({
      playerName,
      scoreCount: await sendGetPlayerScoreCount(playerName),
    }))
  );

  const sortedOtherPlayers = otherPlayerScoreCounts.sort(
    (a, b) => a.scoreCount - b.scoreCount
  );

  const playerOrder = [nextPlayer, ...sortedOtherPlayers.map(player => player.playerName)];

  return {
    bestScoreRanking, // Conserver les objets avec le nom et le meilleur score de chaque joueur
    playerOrder,
  };
}

