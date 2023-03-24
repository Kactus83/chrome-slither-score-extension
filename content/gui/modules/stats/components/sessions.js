import { sendGetActualSession } from "../../../../messages/send-messages.js";

export async function showSessionsStats() {
  const container = document.createElement("div");
  container.classList.add("sessions-stats-container");
  document.body.appendChild(container);

  await sendGetActualSession()
    .then((sessionData) => {
      console.log("session datas : ");
      console.log(sessionData);
      const table = createStatsTable(sessionData.datas.actual_session);
      container.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}

export function hideSessionsStats() {
  const container = document.querySelector(".sessions-stats-container");
  if (container) {
    document.body.removeChild(container);
  }
}

function createStatsTable(sessionData) {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  const headers = ["Player", "Best Score", "Average Score", "Worst Score"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  const playerNames = sessionData.player_names;
  const scores = sessionData.scores;

  playerNames.forEach((playerName) => {
    const playerScores = scores.filter(score => score.playerName === playerName).map(score => score.value);
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
