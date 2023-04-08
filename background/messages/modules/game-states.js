import { addSessionScore, setActiveScore } from '../../utils/sessions.js';

export async function handleGameStates(request) {
  switch (request.type) {
    case 'WAIT_NEXT_TURN':
      return { displayType: 'WAIT_NEXT_TURN' };

    case 'IN_PROGRESS':
      await setActiveScore(request.playerId, new Date());
      return { displayType: 'IN_PROGRESS' };

    case 'GAME_OVER':
      const playerScore = request.playerScore;
      const endDate = new Date();
      await addSessionScore(playerScore, endDate);
      return { displayType: 'GAME_OVER' };

    default:
      throw new Error('Unhandled request type in handleGameStates');
  }
}
