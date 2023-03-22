const DisplayEvents = {
  LOADING: 'display:loading',
  ADD_PLAYER_TO_DATAS: 'display:addPlayerTodatas',
  RESUME_SESSION: 'display:resumeSession',
  INIT_SESSION: 'display:initSession',
  ERROR: 'display:error',
};

const UserEvents = {
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
