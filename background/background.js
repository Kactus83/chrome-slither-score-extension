import { loadLocalDatas } from './utils/local-datas.js';
import { registerPlayer } from './utils/player-service.js';
import {
  startSession,
  endSession,
  updateSession,
  addSessionScore
} from './utils/sessions.js';

chrome.runtime.onInstalled.addListener(function () {
  loadLocalDatas();
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Request received:', request);
  const tabId = sender.tab.id;

  try {
    const localDatas = await loadLocalDatas();

    if (request.type === 'INIT_LOCAL_DATA') {
      console.log('localDatas in background.js:', localDatas);
      chrome.tabs.sendMessage(tabId, { processing: true });

      // Gérer la logique spécifique à l'initialisation des données locales ici, si nécessaire

      chrome.tabs.sendMessage(tabId, { processing: false, ...localDatas, isFirstInitialization: true });
    }

    if (request.type === 'GET_PLAYERS') {
      chrome.tabs.sendMessage(tabId, { processing: true });
      chrome.tabs.sendMessage(tabId, { processing: false, players: localDatas.players });
    } 

    if (request.type === 'GET_ALL_DATA') {
      console.log('localDatas in background.js:', localDatas);
      chrome.tabs.sendMessage(tabId, { processing: true });
      chrome.tabs.sendMessage(tabId, { processing: false, ...localDatas, isFirstInitialization: false });
    } 

    if (request.type === 'REGISTER_PLAYER') {
      const playerName = request.playerName;
      chrome.tabs.sendMessage(tabId, { processing: true });
      const result = registerPlayer(playerName);
      chrome.tabs.sendMessage(tabId, { processing: false, success: result });
    } 

    if (request.type === 'START_SESSION') {
      const playerNames = request.playerNames;
      chrome.tabs.sendMessage(tabId, { processing: true });
      await startSession(playerNames);
      chrome.tabs.sendMessage(tabId, { processing: false });
    } 

    if (request.type === 'END_SESSION') {
      chrome.tabs.sendMessage(tabId, { processing: true });
      await endSession();
      chrome.tabs.sendMessage(tabId, { processing: false });
    } 

    if (request.type === 'UPDATE_SESSION') {
      const updatedSession = request.updatedSession;
      chrome.tabs.sendMessage(tabId, { processing: true });
      await updateSession(updatedSession);
      chrome.tabs.sendMessage(tabId, { processing: false });
    } 

    if (request.type === 'ADD_SESSION_SCORE') {
      const playerName = request.playerName;
      const value = request.value;
      const date = request.date;
      chrome.tabs.sendMessage(tabId, { processing: true });
      await addSessionScore(playerName, value, date);
      chrome.tabs.sendMessage(tabId, { processing: false });
    }
  } catch (error) {
    console.error('Error in onMessage:', error);
    chrome.tabs.sendMessage(tabId, { processing: false, error: error.message });
  }

  return true;
});
