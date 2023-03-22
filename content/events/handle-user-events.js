import eventNames from './eventNames.js';
import {
  sendInitGameSession,
  sendResumeGameSession,
  sendEndGameSession,
  sendAddPlayerToDatas,
} from '../messages/send-messages.js';

export function handleUserEvents(event) {
  switch (event.type) {
    
    case eventNames.UserEvents.ADD_USER_TO_DATAS:
      sendAddPlayerToDatas(event.detail);
      break;

    case eventNames.UserEvents.RESUME_SESSION:
      sendResumeGameSession();
      break;

    case eventNames.UserEvents.INIT_SESSION:
      sendInitGameSession();
      break;

    case eventNames.UserEvents.END_SESSION:
      sendEndGameSession();
      break;

    default:
      console.error('Unhandled UserEvent:', event.type);
  }
}

// Ajouter des écouteurs d'événements pour les événements UserEvents
document.addEventListener(eventNames.UserEvents.ADD_USER_TO_DATAS, handleUserEvents);
document.addEventListener(eventNames.UserEvents.RESUME_SESSION, handleUserEvents);
document.addEventListener(eventNames.UserEvents.INIT_SESSION, handleUserEvents);
document.addEventListener(eventNames.UserEvents.END_SESSION, handleUserEvents);