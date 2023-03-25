import { addSessionScore } from '../../utils/sessions.js';

export async function handleGameStates(request) {
  switch (request.type) {
    case 'WAIT_NEXT_TURN':
      return { displayType: 'WAIT_NEXT_TURN' };

    case 'IN_PROGRESS':
      return { displayType: 'IN_PROGRESS' };

    case 'GAME_OVER':
      const playerScore = request.playerScore;
      await addSessionScore(playerScore, new Date());
      return { displayType: 'GAME_OVER' };

    default:
      throw new Error('Unhandled request type in handleGameStates');
  }
}
