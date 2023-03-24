import eventNames from './eventNames.js';
import { analyzePageAndDispatchEvents } from './handle-in-game.js';
import {
  showLoadingScreen,
  hideLoadingScreen,
  showErrorOverlay,
  showContinueSessionOverlay,
  showStartSessionForm,
  showRegisterPlayerOverlay,
  showNewTurnScreen,
  showInPlayOverlay, 
  showEndTurnScreen
} from '../gui/main-gui.js';

export async function handleDisplayEvents(event) {
  
  switch (event.type) {
    case eventNames.DisplayEvents.LOADING:
      showLoadingScreen();
      break;

    case eventNames.DisplayEvents.ERROR:
      hideLoadingScreen();
      await showErrorOverlay();
      break;

    case eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS:
      hideLoadingScreen();
      console.log(event);
      if(event.detail != "first-add") {
        const playerAdded = event.detail;
        showRegisterPlayerOverlay(playerAdded);
      }else{
        showRegisterPlayerOverlay("first-add");
      }
      break;

    case eventNames.DisplayEvents.RESUME_SESSION:
      hideLoadingScreen();
      showContinueSessionOverlay(event.detail);
      break;

    case eventNames.DisplayEvents.INIT_SESSION:
      hideLoadingScreen();
      showStartSessionForm(event.detail);
      break;

    case eventNames.DisplayEvents.IN_GAME:
      analyzePageAndDispatchEvents();
      break;

    case eventNames.DisplayEvents.IN_GAME_WAITING:
      hideLoadingScreen();
      await showNewTurnScreen(event.detail);
      break;

    case eventNames.DisplayEvents.IN_GAME_PROGRESSING:
      hideLoadingScreen();
      await showInPlayOverlay();
      break;

    case eventNames.DisplayEvents.IN_GAME_FINISHED:
      hideLoadingScreen();
      await showEndTurnScreen();
      break;

    default:
      console.error('Unhandled DisplayEvent:', event.type);
  }
}

// Ajouter des écouteurs d'événements pour les événements DisplayEvents
document.addEventListener(eventNames.DisplayEvents.IN_GAME_WAITING, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.IN_GAME_PROGRESSING, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.IN_GAME_FINISHED, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.LOADING, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.ERROR, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.RESUME_SESSION, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.INIT_SESSION, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.IN_GAME, handleDisplayEvents);
document.addEventListener(eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS, handleDisplayEvents);
