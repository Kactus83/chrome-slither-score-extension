import eventNames from './eventNames.js';
import {
  sendInitGameSession,
  sendSelectedPlayer,
  sendLaunchAddPlayerToDatas,
  sendResumeGameSession,
  sendEndGameSession,
  sendAddPlayerToDatas,
} from '../messages/send-messages.js';

export function handleUserEvents(event) {
  switch (event.type) {
    
    case eventNames.UserEvents.LAUNCH_ADD_USER_TO_DATAS:
      sendLaunchAddPlayerToDatas();
      break;
    
    case eventNames.UserEvents.ADD_USER_TO_DATAS:
      sendAddPlayerToDatas(event.detail);
      break;

    case eventNames.UserEvents.RESUME_SESSION:
      sendResumeGameSession();
      break;

    case eventNames.UserEvents.INIT_SESSION:
      sendInitGameSession(event.detail);
      break;

    case eventNames.UserEvents.END_SESSION:
      sendEndGameSession();
      break;

    case eventNames.UserEvents.SELECT_ACTIVE_PLAYER:
      sendSelectedPlayer(event.detail);
      break;

    default:
      console.error('Unhandled UserEvent:', event.type);
  }
}

// Ajouter des écouteurs d'événements pour les événements UserEvents
document.addEventListener(eventNames.UserEvents.ADD_USER_TO_DATAS, handleUserEvents);
document.addEventListener(eventNames.UserEvents.SELECT_ACTIVE_PLAYER, handleUserEvents);
document.addEventListener(eventNames.UserEvents.LAUNCH_ADD_USER_TO_DATAS, handleUserEvents);
document.addEventListener(eventNames.UserEvents.RESUME_SESSION, handleUserEvents);
document.addEventListener(eventNames.UserEvents.INIT_SESSION, handleUserEvents);
document.addEventListener(eventNames.UserEvents.END_SESSION, handleUserEvents);