import { sendGetAllSessions } from "../../../../messages/send-messages.js";

export class GameStatsComponent {
  constructor() {
    this.container = null;
  }

  async show(overlay) {
    this.container = document.createElement("div");
    this.container.classList.add("game-stats-container");
    overlay.appendChild(this.container);

    await sendGetAllSessions()
      .then((response) => {
        const podiums = this.createPodiums(response.datas.allSessions);
        this.container.appendChild(podiums);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }

  remove() {
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
      this.container = null;
    }
  }

  createPodiums(allSessionsData) {
    const allScores = allSessionsData.flatMap(session => session.scores);
    const playerNames = [...new Set(allScores.map(score => score.playerName))];

    const playersStats = playerNames.map(playerName => {
      const playerScores = allScores.filter(score => score.playerName === playerName).map(score => score.value);
      const bestScore = Math.max(...playerScores);
      const worstScore = Math.min(...playerScores);
      const averageScore = playerScores.reduce((a, b) => a + b, 0) / playerScores.length;
      const gamesPlayed = playerScores.length;

      return {
        playerName,
        bestScore,
        worstScore,
        averageScore,
        gamesPlayed
      };
    });

    const podiumsContainer = document.createElement("div");
    podiumsContainer.classList.add("podiums-container");

    const bestScoresPodium = this.createPodium(playersStats, "Best Scores", "bestScore");
    const worstScoresPodium = this.createPodium(playersStats, "Worst Scores", "worstScore", true);
    const bestAveragesPodium = this.createPodium(playersStats, "Best Averages", "averageScore");
    const mostGamesPlayedPodium = this.createPodium(playersStats, "Most Games Played", "gamesPlayed");

    podiumsContainer.appendChild(bestScoresPodium);
    podiumsContainer.appendChild(worstScoresPodium);
    podiumsContainer.appendChild(bestAveragesPodium);
    podiumsContainer.appendChild(mostGamesPlayedPodium);

    return podiumsContainer;
  }

  createPodium(playersStats, title, statName, reverseOrder = false) {
    const sortedPlayersStats = [...playersStats].sort((a, b) => reverseOrder ? a[statName] - b[statName] : b[statName] - a[statName]);
    const topThree = sortedPlayersStats.slice(0, 3);

    const podiumContainer = document.createElement("div");
    podiumContainer.classList.add("podium-container");

    const podiumTitle = document.createElement("h3");
    podiumTitle.textContent = title;
    podiumContainer.appendChild(podiumTitle);

    topThree.forEach((playerStat, index) => {
      const placeContainer = document.createElement("div");
      placeContainer.classList.add("place-container");

      const placeLabel = document.createElement("span");
      placeLabel.textContent = (index + 1) + ". ";
      placeContainer.appendChild(placeLabel);

      const playerName = document.createElement("span");
      playerName.textContent = playerStat.playerName + ": ";
      placeContainer.appendChild(playerName);

      const statValue = document.createElement("span");
      statValue.textContent = statName === "averageScore" ? playerStat[statName].toFixed(2) : playerStat[statName];
      placeContainer.appendChild(statValue);

      podiumContainer.appendChild(placeContainer);
    });

    return podiumContainer;
  }
}
