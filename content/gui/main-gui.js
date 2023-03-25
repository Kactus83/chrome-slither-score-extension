import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from './modules/loading/loading-overlay.js';
import {
  createContinueSessionOverlay,
  removeContinueSessionOverlay,
} from './modules/continue-session/continue-session-overlay.js';
import {
  createInPlayOverlay,
  removeInPlayOverlay,
} from './modules/in-play/in-play-overlay.js';
import {
  createErrorOverlay,
  removeErrorOverlay,
} from './modules/error/error-overlay.js';
import {
  createStartSessionOverlay,
  removeStartSessionOverlay,
} from './modules/start-session/start-session-overlay.js';
import {
  createEndTurnDisplay,
  removeEndTurnDisplay,
} from './modules/end-turn/end-turn-display.js';
import {
  createNewTurnDisplay,
  removeNewTurnDisplay,
} from './modules/new-turn/new-turn-display.js';
import {
  createRegisterPlayerOverlay,
  removeRegisterPlayerOverlay,
} from './modules/register-player/register-player.js';
import { 
  insertStatsButton, 
  removeStatsButton 
} from './modules/stats/stats.js';

export async function showLoadingScreen() {
  removeStatsButton();
  showLoadingOverlay();
}

export async function hideLoadingScreen() {
  hideLoadingOverlay();
}

export async function showContinueSessionOverlay(session) {
  removeStatsButton();
  const overlay = createContinueSessionOverlay(session);
  document.body.appendChild(overlay);
}

export async function hideContinueSessionOverlay() {
  removeContinueSessionOverlay();
}

export async function showStartSessionForm(players) {
  removeStatsButton();
  const overlay = createStartSessionOverlay(players);
  document.body.appendChild(overlay);
}

export async function hideStartSessionForm() {
  removeStartSessionOverlay();
}

export async function showEndTurnScreen() {
  removeStatsButton();
  const display = await createEndTurnDisplay();
  document.body.appendChild(display);
}

export async function hideEndTurnScreen() {
  removeEndTurnDisplay();
}

export async function showNewTurnScreen() {
  await insertStatsButton();
  await createNewTurnDisplay();
}

export async function hideNewTurnScreen() {
  removeStatsButton();
  removeNewTurnDisplay();
}

export async function showErrorOverlay() {
  removeStatsButton();
  const overlay = createErrorOverlay();
  document.body.appendChild(overlay);
}

export async function hideErrorOverlay() {
  removeErrorOverlay();
}

export async function showRegisterPlayerOverlay(playerAdded) {
  removeStatsButton();
  const overlay = createRegisterPlayerOverlay(playerAdded);
  document.body.appendChild(overlay);
}

export async function hideRegisterPlayerOverlay() {
  removeRegisterPlayerOverlay();
}

export async function showInPlayOverlay() {
  removeStatsButton();
  const overlay = createInPlayOverlay();
  document.body.appendChild(overlay);
}

export async function hideInPlayOverlay() {
  removeInPlayOverlay();
}