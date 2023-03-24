import { sendGetActualSession } from "../../../../messages/send-messages.js";

export async function showSessionsStats() {
  const container = document.createElement("div");
  container.classList.add("sessions-stats-container");
  document.body.appendChild(container);

  await sendGetActualSession()
    .then((sessionData) => {
      const table = createStatsTable(sessionData);
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

  sessionData.players.forEach((player) => {
    const row = document.createElement("tr");

    const playerName = document.createElement("td");
    playerName.textContent = player.name;
    row.appendChild(playerName);

    const bestScore = document.createElement("td");
    bestScore.textContent = player.bestScore;
    row.appendChild(bestScore);

    const averageScore = document.createElement("td");
    averageScore.textContent = player.averageScore.toFixed(2);
    row.appendChild(averageScore);

    const worstScore = document.createElement("td");
    worstScore.textContent = player.worstScore;
    row.appendChild(worstScore);

    table.appendChild(row);
  });

  return table;
}

  