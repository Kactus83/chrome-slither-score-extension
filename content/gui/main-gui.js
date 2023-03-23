import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from './components/loading-overlay.js';
import {
  createContinueSessionOverlay,
  removeContinueSessionOverlay,
} from './components/continue-session-overlay.js';
import {
  createErrorOverlay,
  removeErrorOverlay,
} from './components/error-overlay.js';
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
import {
  createRegisterPlayerOverlay,
  removeRegisterPlayerOverlay,
} from './components/register-player.js';

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

export async function showNewTurnScreen(session) {
  const display = createNewTurnDisplay(session.player_names);
  const nickHolder = document.getElementById('nick_holder');
  const parentElement = nickHolder.parentElement;

  parentElement.insertBefore(display, nickHolder);
}

export async function hideNewTurnScreen() {
  removeNewTurnDisplay();
}

export async function showErrorOverlay() {
  const overlay = createErrorOverlay();
  document.body.appendChild(overlay);
}

export async function hideErrorOverlay() {
  removeErrorOverlay();
}

export async function showRegisterPlayerOverlay(playerAdded) {
  const overlay = createRegisterPlayerOverlay(playerAdded);
  document.body.appendChild(overlay);
}

export async function hideRegisterPlayerOverlay() {
  removeRegisterPlayerOverlay();
}

export async function showInPlayOverlay() {
  const overlay = createInPlayOverlay();
  document.body.appendChild(overlay);
}

export async function hideInPlayOverlay() {
  removeInPlayOverlay();
}