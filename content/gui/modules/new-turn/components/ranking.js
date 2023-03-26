import {
  sendGetBestScoreRanking
} from "../../../../messages/send-messages.js";

export class RankingComponent {
  constructor() {
    this.rankingDiv = null;
    this.playerClickHandler = null;
  }

  async init() {
    this.appendStylesheet();
    const bestScoreRanking = await this.fetchBestScoreRanking();
    this.rankingDiv = this.createRankingDiv(bestScoreRanking);
    this.playerClickHandler = this.handlePlayerClick.bind(this);
    this.addEventListeners();
  }

  async fetchBestScoreRanking() {
    const response = await sendGetBestScoreRanking();
    console.log(response);
;    return response.datas.bestScoreRanking;
  }

  createRankingDiv(bestScoreRanking) {
    const rankingDiv = document.createElement('div');
    rankingDiv.id = 'ranking-component';
    rankingDiv.classList.add('ranking');

    let rankingHTML = `<div class="ranking-title">Classement</div>`;
    bestScoreRanking.forEach((player, index) => {
      rankingHTML += `<div class="ranking-player" data-rank="${index + 1}">
                        <span class="ranking-position">${index + 1}</span>
                        <span class="ranking-name">${player.playerName}</span>
                        <span class="ranking-score">${player.bestScore}</span>
                      </div>`;
    });

    rankingDiv.innerHTML = rankingHTML;
    return rankingDiv;
  }

  handlePlayerClick(event) {
    // Ici, on peut ajouter du code pour gérer le clic sur un joueur si nécessaire
  }

  addEventListeners() {
    const rankingPlayers = this.rankingDiv.querySelectorAll('.ranking-player');
    rankingPlayers.forEach((playerElement) => {
      playerElement.addEventListener('click', this.playerClickHandler);
    });
  }

  removeEventListeners() {
    const rankingPlayers = this.rankingDiv.querySelectorAll('.ranking-player');
    rankingPlayers.forEach((playerElement) => {
      playerElement.removeEventListener('click', this.playerClickHandler);
    });
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/new-turn/components/ranking.css');
    document.head.appendChild(link);
  }

  insert() {
    const logoDiv = document.getElementById('logo');
    logoDiv.insertAdjacentElement('afterend', this.rankingDiv);
  }

  remove() {
    this.removeEventListeners();
    this.removeRankingDiv();
  }

  removeRankingDiv() {
    if (this.rankingDiv) {
      this.rankingDiv.remove();
      this.rankingDiv = null;
    }
  }
}

export default RankingComponent;
