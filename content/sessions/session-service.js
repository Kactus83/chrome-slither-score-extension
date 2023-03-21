import {
    sendStartSession,
    sendEndSession,
    sendUpdateSession,
    sendAddSessionScore,
  } from './messages.js';
  
  export async function startSession(playerNames) {
    // Logique pour démarrer une session
    const response = await sendStartSession(playerNames);
    // Traiter la réponse et effectuer d'autres actions si nécessaire
  }
  
  export async function endSession() {
    // Logique pour terminer une session
    const response = await sendEndSession();
    // Traiter la réponse et effectuer d'autres actions si nécessaire
  }
  
  export async function updateSession(updatedSession) {
    // Logique pour mettre à jour une session
    const response = await sendUpdateSession(updatedSession);
    // Traiter la réponse et effectuer d'autres actions si nécessaire
  }
  
  export async function addSessionScore(playerName, value, date) {
    // Logique pour ajouter un score à une session
    const response = await sendAddSessionScore(playerName, value, date);
    // Traiter la réponse et effectuer d'autres actions si nécessaire
  }
  