import eventNames from './eventNames.js';
import { analyzePageAndDispatchEvents } from './handle-in-game.js';
import { MainGUI } from '../gui/main-gui.js';

const mainGUI = new MainGUI();

let isInit = false;

export async function handleDisplayEvents(event) {

  if(!isInit) {
    mainGUI.stats.init();
  }

  if(event.type === eventNames.DisplayEvents.IN_GAME_WAITING) {
    mainGUI.stats.show();
  }else{
    mainGUI.stats.hide();
  }

  console.log("--------------- display event : ");
  console.log(event);

  mainGUI.hideUselessElements();

  switch (event.type) {
    case eventNames.DisplayEvents.LOADING:
      mainGUI.showLoadingScreen();
      break;

    case eventNames.DisplayEvents.ERROR:
      mainGUI.hideLoadingScreen();
      await mainGUI.showErrorScreen();
      break;

    case eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS:
      mainGUI.hideLoadingScreen();
      mainGUI.showRegisterPlayerOverlay();
      break;

    case eventNames.DisplayEvents.PLAYER_ADDED_TO_DATAS:
      mainGUI.registerPlayerComponent.showConfirmationMessage(event.detail);
      break;

    case eventNames.DisplayEvents.RESUME_SESSION:
      mainGUI.hideLoadingScreen();
      mainGUI.showContinueSessionScreen(event.detail);
      break;

    case eventNames.DisplayEvents.INIT_SESSION:
      mainGUI.hideLoadingScreen();
      mainGUI.showStartSessionForm();
      break;

    case eventNames.DisplayEvents.IN_GAME:
      analyzePageAndDispatchEvents();
      break;

    case eventNames.DisplayEvents.IN_GAME_WAITING:
      mainGUI.hideLoadingScreen();
      await mainGUI.showNewTurnScreen();
      break;

    case eventNames.DisplayEvents.IN_GAME_PROGRESSING:
      mainGUI.hideLoadingScreen();
      await mainGUI.showInPlayScreen(); 
      break;

    case eventNames.DisplayEvents.IN_GAME_FINISHED:
      mainGUI.hideLoadingScreen();
      await mainGUI.showEndTurnScreen();
      break;

    default:
      console.error('Unhandled DisplayEvent:', event.type);
  }
}

export function initializeDisplayEventListeners() {
  document.addEventListener(eventNames.DisplayEvents.IN_GAME_WAITING, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.IN_GAME_PROGRESSING, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.IN_GAME_FINISHED, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.LOADING, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.ERROR, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.RESUME_SESSION, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.INIT_SESSION, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.IN_GAME, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS, handleDisplayEvents);
  document.addEventListener(eventNames.DisplayEvents.PLAYER_ADDED_TO_DATAS, handleDisplayEvents);
}
