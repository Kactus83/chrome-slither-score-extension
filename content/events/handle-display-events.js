import eventNames from './eventNames.js';
import {
  showLoadingScreen,
  hideLoadingScreen,
  showErrorOverlay,
  showContinueSessionOverlay,
  showStartSessionForm,
  showRegisterPlayerOverlay
} from '../gui/main-gui.js';

export function handleDisplayEvents(event) {
  switch (event.type) {
    case eventNames.DisplayEvents.LOADING:
      showLoadingScreen();
      break;

    case eventNames.DisplayEvents.ERROR:
      hideLoadingScreen();
      showErrorOverlay();
      break;

    case eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS:
      hideLoadingScreen();
      if(event.detail != "first-add") {
        const playerAdded = event.detail;
        showRegisterPlayerOverlay(playerAdded);
      }else{
        showRegisterPlayerOverlay("first-add");
      }
      break;

    case eventNames.DisplayEvents.RESUME_SESSION:
      hideLoadingScreen();
      showContinueSessionOverlay(event.detail.session);
      break;

    case eventNames.DisplayEvents.INIT_SESSION:
      hideLoadingScreen();
      showStartSessionForm(event.detail.players);
      break;

    default:
      console.error('Unhandled DisplayEvent:', event.type);
  }
}

// Ajouter des écouteurs d'événements pour les événements DisplayEvents
document.addEventListener(eventNames.DisplayEvents.LOADING, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.ERROR, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.RESUME_SESSION, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.INIT_SESSION, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS, handleDisplayEvents);
