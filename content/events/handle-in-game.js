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

function determineGameState() {
  const nickHolder = document.getElementById('nick_holder');
  const loginDiv = document.querySelector('.login');
  const scoreDiv = document.querySelector('.score'); // Nouvelle div pour identifier le score

  if (nickHolder && loginDiv && !scoreDiv) {
    return 'WAIT_NEXT_TURN';
  } else if (!loginDiv) {
    return 'IN_PROGRESS';
  } else if (nickHolder && loginDiv && scoreDiv) {
    return 'GAME_OVER';
  } else {
    console.error('Unable to determine game state');
    return null;
  }
}

export function analyzePageAndDispatchEvents(session) {
  const gameState = determineGameState();

  switch (gameState) {
    case 'WAIT_NEXT_TURN':
      const nextPlayerName = findNextPlayer(session);
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.WAIT_NEXT_TURN, { detail: nextPlayerName }));
      break;
    case 'IN_PROGRESS':
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.IN_PROGRESS, { detail: session }));
      break;
    case 'GAME_OVER':
      const finalScore = getFinalScore(); 
      document.dispatchEvent(new CustomEvent(eventNames.GameEvents.GAME_OVER, { detail: { session, finalScore } }));
      break;
    default:
      console.error('Unhandled game state:', gameState);
  }
}

function getFinalScore() {
  return 1000; // Définir la fonction getFinalScore pour récupérer le score final
}