import eventNames from '../events/eventNames.js';

export async function onBackgroundMessage(response, callback) {
  console.log("réponse reçue : ");
  console.log(response);

  // Gérer les erreurs
  if (response.error) {
    document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.ERROR, { detail: { error: response.error }}));
  } else {
    // Gérer les messages de type 'resume session' et 'init session'
    switch (response.displayType) {
      case 'RESUME_SESSION':
        document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.RESUME_SESSION));
      break;

      case 'PAGE_VISITED':
        document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.LOADING));
      break;

      case 'ADD_PLAYER_TO_DATAS':
        if(response.datas != "first-add") {
          document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS, { detail: { success: response.datas }}));
        }else{
          document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS));
        }
      break;

      case 'INIT_SESSION':
        document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.INIT_SESSION, { detail: response.datas }));
      break;

      case 'IN_GAME':
        document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.IN_GAME));
      break;

      case 'ERROR':
        document.dispatchEvent(new CustomEvent(eventNames.DisplayEvents.ERROR), { detail: { error: response.datas }});
      break;

      default:
        console.error("Type de message non géré:", response.displayType);
    }
  }

  // Appeler le callback à la fin du traitement des messages
  callback();
}
