import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from './components/loading-overlay.js';
import {
  createContinueSessionOverlay,
  removeContinueSessionOverlay,
} from './components/continue-session-overlay.js';
import {
  createStartSessionOverlay,
  removeStartSessionOverlay,
} from './components/start-session-overlay.js';
import {
  createEndTurnDisplay,
  removeEndTurnDisplay,
} from './components/end-turn-display.js';
import {
  createNewTurnDisplay,
  removeNewTurnDisplay,
} from './components/new-turn-display.js';

export async function showLoadingScreen() {
  showLoadingOverlay();
}

export async function hideLoadingScreen() {
  hideLoadingOverlay();
}

export async function showContinueSessionOverlay(session) {
  const overlay = createContinueSessionOverlay(session);
  document.body.appendChild(overlay);
}

export async function hideContinueSessionOverlay() {
  removeContinueSessionOverlay();
}

export async function showStartSessionForm(players) {
  const overlay = createStartSessionOverlay(players);
  document.body.appendChild(overlay);
}

export async function hideStartSessionForm() {
  removeStartSessionOverlay();
}

export async function showEndTurnScreen(score) {
  const display = createEndTurnDisplay(score);
  document.body.appendChild(display);
}

export async function hideEndTurnScreen() {
  removeEndTurnDisplay();
}

export async function showNewTurnScreen(players) {
  const display = createNewTurnDisplay(players);
  const nickHolder = document.getElementById('nick_holder');
  const parentElement = nickHolder.parentElement;

  parentElement.insertBefore(display, nickHolder);
  parentElement.removeChild(nickHolder);
}

export async function hideNewTurnScreen() {
  removeNewTurnDisplay();
}
