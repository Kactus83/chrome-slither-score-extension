const DisplayEvents = {
  LOADING: 'display:loading',
  ADD_PLAYER_TO_DATAS: 'display:addPlayerTodatas',
  RESUME_SESSION: 'display:resumeSession',
  INIT_SESSION: 'display:initSession',
  IN_GAME: 'display:inGame',
  IN_GAME_WAITING: 'display:inGameWaiting',
  IN_GAME_PROGRESSING: 'display:inGameProgressing',
  IN_GAME_FINISHED: 'display:inGameFinished',
  ERROR: 'display:error',
};

const UserEvents = {
  LAUNCH_ADD_USER_TO_DATAS: 'user:launchAddUserToDatas',
  ADD_USER_TO_DATAS: 'user:addUserToDatas',
  RESUME_SESSION: 'user:resumeSession',
  INIT_SESSION: 'user:initSession',
  END_SESSION: 'user:endSession',
};

const PageEvents = {
  ARRIVED: 'page:arrived',
  LOADED: 'page:loaded',
};

const GameEvents = {
  IN_PROGRESS: 'game:inProgress',
  GAME_OVER: 'game:gameOver',
  WAIT_NEXT_TURN: 'game:waitNextTurn',
};

export default {
  DisplayEvents,
  UserEvents,
  PageEvents,
  GameEvents,
};
