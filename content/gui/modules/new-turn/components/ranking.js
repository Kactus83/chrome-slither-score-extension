import {
  sendGetActualSession
} from "../../../../messages/send-messages.js";

function showPlayerDetails(playerName, playerScores) {
  const overlay = document.createElement('div');
  overlay.id = 'player-details-overlay';
  overlay.classList.add('player-details-overlay');

  let playerDetailsHTML = `
    <div class="player-details">
      <h2>${playerName}</h2>
      <ul class="player-scores">
  `;

  playerScores.forEach((score, index) => {
    playerDetailsHTML += `<li>${index + 1}. ${score.value} (${score.date})</li>`;
  });

  playerDetailsHTML += `
      </ul>
      <button id="close-details">Fermer</button>
    </div>
  `;

  overlay.innerHTML = playerDetailsHTML;
  document.body.appendChild(overlay);

  const closeDetailsButton = document.getElementById('close-details');
  closeDetailsButton.addEventListener('click', () => {
    overlay.remove();
  });
}

export function showRanking(bestScoreRanking) {
  console.log('best score in component : ');
  console.log(bestScoreRanking);
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
  const logoDiv = document.getElementById('logo');
  logoDiv.insertAdjacentElement('afterend', rankingDiv);

  const rankingPlayers = document.querySelectorAll('.ranking-player');
  rankingPlayers.forEach((playerElement) => {
    playerElement.addEventListener('click', async () => {
      const playerName = playerElement.querySelector('.ranking-name').textContent;
      const response = await sendGetActualSession();
      const actualSession = response.datas.actual_session;
      const playerScores = actualSession.scores.filter(score => score.playerName === playerName);
      showPlayerDetails(playerName, playerScores);
    });
  });
}

export function removeRanking() {
  const rankingDiv = document.getElementById('ranking-component');
  const overlay = document.getElementById('player-details-overlay');
  
  if (rankingDiv) {
    rankingDiv.remove();
  }

  if (overlay) {
    overlay.remove();
  }
}
