import { onBackgroundMessage } from "./handle-messages.js";
import { sendGetPlayerNameAvailability, sendGetPlayerBestScore, sendGetSessionAverageScore, sendGetNextPlayer, sendGetBestScoreRanking, sendGetAverageScoreRanking, sendGetPlayerScoreCount, sendGetPlayerTotalScore, sendGetTotalScores, sendGetLastScore } from './modules/get-datas';
import { sendPageVisited, sendPageLoaded, sendLaunchAddPlayerToDatas, sendLaunchInitGameSession } from './modules/page-and-routing';
import { sendInitGameSession, sendResumeGameSession, sendEndGameSession, sendSelectedPlayer, sendAddPlayerToDatas } from './modules/user-actions';
import { sendGameStatusWaitTurn, sendGameStatusInProgress, sendGameStatusGameOver } from './modules/game-states';

async function sendRequest(request) {
  console.log("sending request : ");
  console.log(request);
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(request, (response) => {
      onBackgroundMessage(response, () => {
        resolve(response);
      });
    });
  });
}

export {
  sendPageVisited,
  sendPageLoaded,
  sendLaunchAddPlayerToDatas,
  sendLaunchInitGameSession,
  sendInitGameSession,
  sendResumeGameSession,
  sendEndGameSession,
  sendSelectedPlayer,
  sendAddPlayerToDatas,
  sendGameStatusWaitTurn,
  sendGameStatusInProgress,
  sendGameStatusGameOver,
  sendGetPlayerNameAvailability,
  sendGetPlayerBestScore,
  sendGetSessionAverageScore,
  sendGetNextPlayer,
  sendGetBestScoreRanking,
  sendGetAverageScoreRanking,
  sendGetPlayerScoreCount,
  sendGetPlayerTotalScore,
  sendGetTotalScores,
  sendGetLastScore
};
