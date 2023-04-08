import { sendGetActualSession } from "../../../../messages/send-messages.js";

export class SessionsStatsComponent {
  constructor() {
    this.container = null;
  }

  async show(overlay) {
    this.container = document.createElement("div");
    this.container.classList.add("sessions-stats-container");
    overlay.appendChild(this.container);

    await sendGetActualSession()
      .then((sessionData) => {
        const table = this.createStatsTable(sessionData.datas.actual_session);
        this.container.appendChild(table);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }

  remove() {
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
      this.container = null;
    }
  }

  createStatsTable(sessionData) {
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
  
    const headers = ["Player", "Best Score", "Average Score", "Worst Score"];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    table.appendChild(headerRow);
  
    const playerParams = sessionData.session_params.playerParams; // Accédez aux PlayerParam
    const scores = sessionData.scores;
  
    playerParams.forEach((playerParam) => {
      const playerName = playerParam.name; // Accédez au nom du joueur depuis PlayerParam
      const playerId = playerParam.playerId; // Accédez à l'ID du joueur depuis PlayerParam
      const playerScores = scores.filter(score => score.playerId === playerId).map(score => score.value); // Filtrez les scores en fonction de l'ID du joueur
      const bestScore = Math.max(...playerScores);
      const worstScore = Math.min(...playerScores);
      const averageScore = playerScores.reduce((a, b) => a + b, 0) / playerScores.length;
  
      const row = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = playerName;
      row.appendChild(nameCell);
  
      const bestScoreCell = document.createElement("td");
      bestScoreCell.textContent = bestScore;
      row.appendChild(bestScoreCell);
  
      const averageScoreCell = document.createElement("td");
      averageScoreCell.textContent = averageScore.toFixed(2);
      row.appendChild(averageScoreCell);
  
      const worstScoreCell = document.createElement("td");
      worstScoreCell.textContent = worstScore;
      row.appendChild(worstScoreCell);
  
      table.appendChild(row);
    });
  
    return table;
  }
  
}
