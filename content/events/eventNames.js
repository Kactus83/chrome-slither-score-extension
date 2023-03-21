const BackgroundEvents = {
    WORKING: 'background:working',
    LOADING: 'background:loading',
    ERROR: 'background:error',
    NEW_LOCAL_DATA: 'background:newLocalData',
  };
  
  const PageEvents = {
    ARRIVED: 'page:arrived',
    LOADED: 'page:loaded',
  };
  
  const UserEvents = {
    INITIALIZE_SESSION: 'user:initializeSession',
    START_SESSION: 'user:startSession',
    RESUME_SESSION: 'user:resumeSession',
    ADD_PLAYER: 'user:addPlayer',
    SELECT_ACTIVE_PLAYER: 'user:selectActivePlayer',
  };
  
  const GameEvents = {
    START_PLAYER_TURN: 'game:startPlayerTurn',
    END_PLAYER_TURN: 'game:endPlayerTurn',
    WAIT_NEXT_TURN: 'game:waitNextTurn',
  };
  
  export default {
    BackgroundEvents,
    PageEvents,
    UserEvents,
    GameEvents,
  };
  