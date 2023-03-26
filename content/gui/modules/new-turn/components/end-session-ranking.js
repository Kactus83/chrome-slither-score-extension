import { sendGetActualSession } from "../../../../messages/send-messages.js";

export class EndSessionRankingComponent {
  constructor() {
    this.rankingContainer = null;
  }

  async showRanking(overlay) {
    this.rankingContainer = document.createElement("div");
    this.rankingContainer.classList.add("ranking-container");
    overlay.appendChild(this.rankingContainer);

    await sendGetActualSession()
      .then((response) => {
        console.log(response);
        const actualSession = response.datas.actual_session;
        const rankingData = this.extractRankingData(actualSession);
        const ranking = this.createRanking(rankingData);
        this.rankingContainer.appendChild(ranking);
      })
      .catch((error) => {
        console.error("Error fetching ranking data:", error);
      });
  }

  extractRankingData(actualSession) {
    const playerScores = {};

    actualSession.scores.forEach(score => {
      if (!playerScores[score.playerName]) {
        playerScores[score.playerName] = score.value;
      } else {
        playerScores[score.playerName] = Math.max(playerScores[score.playerName], score.value);
      }
    });

    const rankingData = Object.keys(playerScores).map(playerName => ({
      playerName,
      bestScore: playerScores[playerName],
    }));

    rankingData.sort((a, b) => b.bestScore - a.bestScore);

    return rankingData;
  }

  remove() {
    if (this.rankingContainer && this.rankingContainer.parentElement) {
      this.rankingContainer.parentElement.removeChild(this.rankingContainer);
      this.rankingContainer = null;
    }
  }

  createRanking(rankingData) {
    const ranking = document.createElement("div");
    ranking.classList.add("ranking");

    const rankingTitle = document.createElement("h2");
    rankingTitle.textContent = "Classement";
    rankingTitle.classList.add("ranking-title");
    ranking.appendChild(rankingTitle);

    rankingData.forEach((player, index) => {
      const rankingPlayer = document.createElement("div");
      rankingPlayer.classList.add("ranking-player");

      const rankingPosition = document.createElement("span");
      rankingPosition.textContent = `${index + 1}.`;
      rankingPosition.classList.add("ranking-position");
      rankingPlayer.appendChild(rankingPosition);

      const rankingName = document.createElement("span");
      rankingName.textContent = player.playerName;
      rankingName.classList.add("ranking-name");
      rankingPlayer.appendChild(rankingName);

      const rankingScore = document.createElement("span");
      rankingScore.textContent = player.bestScore;
      rankingScore.classList.add("ranking-score");
      rankingPlayer.appendChild(rankingScore);

      ranking.appendChild(rankingPlayer);
    });

    return ranking;
  }
}
