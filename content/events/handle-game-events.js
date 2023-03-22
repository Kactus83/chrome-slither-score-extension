import eventNames from './eventNames.js';
import {
  sendGameStatusGameOver,
  sendGameStatusInProgress,
  sendGameStatusWaitTurn
} from '../messages/send-messages.js';

export function handleGameEvents(event) {

  switch (event.type) {
    case eventNames.GameEvents.WAIT_NEXT_TURN:
      sendGameStatusWaitTurn(event.detail);
      break;

    case eventNames.GameEvents.IN_PROGRESS:
      sendGameStatusInProgress(event.detail);
      break;

    case eventNames.GameEvents.GAME_OVER:
      sendGameStatusGameOver(event.detail);
      break;

    default:
      console.error('Unhandled gameEvent:', event.type);
  }
}

// Ajouter des écouteurs d'événements pour les événements GameEvents
document.addEventListener(eventNames.GameEvents.WAIT_NEXT_TURN, handleGameEvents);
document.addEventListener(eventNames.GameEvents.IN_PROGRESS, handleGameEvents);
document.addEventListener(eventNames.GameEvents.GAME_OVER, handleGameEvents);
  