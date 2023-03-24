export function showRanking(bestScoreRanking) {
  console.log("best score in component : ");
  console.log(bestScoreRanking);
  const rankingDiv = document.createElement('div');
  rankingDiv.id = "ranking-component";
  rankingDiv.classList.add("ranking");

  let rankingHTML = `<div class="ranking-title">Classement</div>`;
  bestScoreRanking.forEach((player, index) => {
    rankingHTML += `<div class="ranking-player" data-rank="${index + 1}">
                      <span class="ranking-position">${index + 1}</span>
                      <span class="ranking-name">${player.playerName}</span>
                      <span class="ranking-score">${player.value}</span>
                    </div>`;
  });

  rankingDiv.innerHTML = rankingHTML;
  const logoDiv = document.getElementById('logo');
  logoDiv.insertAdjacentElement('afterend', rankingDiv);
}


export function removeRanking() {
  const rankingDiv = document.getElementById('ranking-component');
  if (rankingDiv) {
    rankingDiv.remove();
  }
}
