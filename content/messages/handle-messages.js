import eventNames from './eventNames';

export function onBackgroundMessage(response, callback) {
  if (response.processing) {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.WORKING));
  } else {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.LOADING));
  }

  if (response.error) {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.ERROR, { detail: { error: response.error }}));
  } 

  if ('players' in response || 'sessions' in response) {
    

    if (response.isFirstInitialization) {
      document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.DATA_INITIALIZED, { detail: { ...response }}));
    }else{
      document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.NEW_LOCAL_DATA, { detail: { ...response }}));
    }
  }

  callback(response);
}
