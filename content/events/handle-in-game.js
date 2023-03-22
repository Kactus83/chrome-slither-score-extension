import eventNames from './eventNames.js';

function findNextPlayer(session) {
  if (session.scores.length === 0) {
    return session.player_names[0];
  }

  const lastScore = session.scores[session.scores.length - 1];
  const lastPlayerIndex = session.player_names.findIndex(playerName => playerName === lastScore.playerName);

  if (lastPlayerIndex === session.player_names.length - 1) {
    return session.player_names[0];
  } else {
    return session.player_names[lastPlayerIndex + 1];
  }
}

function determineGameState(session) {
  const nickHolder = document.getElementById('nick_holder');
  const loginDiv = document.querySelector('.login');

  if (nickHolder && loginDiv) {
    return 'WAIT_NEXT_TURN';
  } else if (!loginDiv) {
    // Une condition pour identifier "GAME_OVER" sera nécessaire après avoir accès à la page et identifier l'élément correspondant
    return 'IN_PROGRESS';
  } else {
    console.error('Unable to determine game state');
    return null;
  }
}

export function analyzePageAndDispatchEvents(session) {
  const gameState = determineGameState(session);

  switch (gameState) {
    case 'WAIT_NEXT_TURN':
      const nextPlayerName = findNextPlayer(session);
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN, { detail: nextPlayerName }));
      break;
    case 'IN_PROGRESS':
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: session }));
      break;
    case 'GAME_OVER':
      // Ici, on pourra ajouter des informations sur le score une fois qu'on pourra l'identifier
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.GAME_OVER, { detail: session }));
      break;
    default:
      console.error('Unhandled game state:', gameState);
  }
}
