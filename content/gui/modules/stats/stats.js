import { showGameStats, hideGameStats } from "./components/game.js";
import { showPlayersStats, hidePlayersStats } from "./components/players.js";
import { showSessionsStats, hideSessionsStats } from "./components/sessions.js";

export function createStatsButton() {
  const button = document.createElement('button');
  button.textContent = 'Stats';
  button.classList.add('stats-button');

  button.addEventListener('click', () => {
    showStatsOverlay();
    button.style.display = 'none';
  });

  return button;
}

export function showStatsOverlay() {
  const overlay = createOverlay();
  document.body.appendChild(overlay);
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('stats-overlay');

  const closeButton = createCloseButton(overlay);
  overlay.appendChild(closeButton);

  const gameButton = createButton('Game Stats', () => {
    hideButtons();
    showGameStats();
  });

  const playersButton = createButton('Players Stats', () => {
    hideButtons();
    showPlayersStats();
  });

  const sessionsButton = createButton('Sessions Stats', () => {
    hideButtons();
    showSessionsStats();
  });

  const backButton = createButton('Back', () => {
    hideGameStats();
    hidePlayersStats();
    hideSessionsStats();
    showButtons();
  });

  overlay.appendChild(gameButton);
  overlay.appendChild(playersButton);
  overlay.appendChild(sessionsButton);
  overlay.appendChild(backButton);

  function hideButtons() {
    gameButton.style.display = 'none';
    playersButton.style.display = 'none';
    sessionsButton.style.display = 'none';
    backButton.style.display = 'block';
  }

  function showButtons() {
    gameButton.style.display = 'block';
    playersButton.style.display = 'block';
    sessionsButton.style.display = 'block';
    backButton.style.display = 'none';
  }

  return overlay;
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add('stats-button');
  button.addEventListener('click', onClick);
  return button;
}

function createCloseButton(overlay) {
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
    const statsButton = document.querySelector('.stats-button');
    if (statsButton) {
      statsButton.style.display = 'block';
    }
  });
  return closeButton;
}
