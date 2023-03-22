import eventNames from '../events/eventNames.js';

export function onBackgroundMessage(response, callback) {
  console.log("réponse reçue : ");
  console.log(response);

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
    } else {
      document.dispatchEvent(new CustomEvent(eventNames.BackgroundEvents.NEW_LOCAL_DATA, { detail: { ...response }}));
    }
  }

  // Ajouter cette ligne pour s'assurer que callback est appelé après tous les autres traitements
  callback();
}
