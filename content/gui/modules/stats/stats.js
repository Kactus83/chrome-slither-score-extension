import { showGameStats, hideGameStats } from "./components/game.js";
import { showPlayersStats, hidePlayersStats } from "./components/players.js";
import { showSessionsStats, hideSessionsStats } from "./components/sessions.js";

export function createStatsButton() {
  const button = document.createElement('button');
  button.textContent = 'Stats';
  button.classList.add('stats-button');
  button.classList.add('main-stats-button');

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

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');

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

  buttonsContainer.appendChild(gameButton);
  buttonsContainer.appendChild(playersButton);
  buttonsContainer.appendChild(sessionsButton);
  overlay.appendChild(buttonsContainer);
  overlay.appendChild(backButton);

  function hideButtons() {
    buttonsContainer.style.display = 'none';
    backButton.style.display = 'block';
  }

  function showButtons() {
    buttonsContainer.style.display = 'flex';
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

export function insertStatsButton() {
  

  // Ajouter ces lignes pour charger le CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/modules/stats/stats.css');
  document.head.appendChild(link);
  
  const existingIframe = document.querySelector("iframe[src='/social-box/']");
  if (existingIframe) {
    existingIframe.style.display = "none";
  }

  const statsButton = document.querySelector(".stats-button");
  if (!statsButton) {
    const newStatsButton = createStatsButton();
    if (existingIframe && existingIframe.parentElement) {
      existingIframe.parentElement.insertBefore(newStatsButton, existingIframe);
    } else {
      document.body.appendChild(newStatsButton);
    }
  } else {
    statsButton.style.display = "block";
  }
}


export function removeStatsButton() {
  const statsButton = document.querySelector(".stats-button");
  if (statsButton) {
    statsButton.style.display = "none";
  }

  const existingIframe = document.querySelector("iframe[src='/social-box/']");
  if (existingIframe) {
    existingIframe.style.display = "block";
  }
}
