import eventNames from './eventNames';

export function onBackgroundMessage(response, callback) {
  if (response.processing) {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.WORKING));
  } else {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.LOADING));
  }

  if (response.error) {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.ERROR, { detail: { error: response.error }}));
  } else if ('players' in response || 'sessions' in response) {
    document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.NEW_LOCAL_DATA, { detail: { ...response }}));
  }

  callback(response);
}
