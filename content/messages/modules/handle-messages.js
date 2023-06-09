import eventNames from '../../events/eventNames.js';

export async function onBackgroundMessage(response, callback) {
  console.log("réponse reçue : ");
  console.log(response);

  // Gérer les erreurs
  if (response.error) {
    document.dispatchEvent(
      new CustomEvent(eventNames.DisplayEvents.ERROR, {
        detail: { error: response.error },
      })
    );
  } else {
    if (response.displayType === 'NONE') {
      callback(response.datas); // Retourner les données sans émettre d'événement
    } else {
      // Gérer les messages de type 'resume session' et 'init session'
      switch (response.displayType) {
        case 'RESUME_SESSION':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.RESUME_SESSION)
          );
          break;

        case 'PAGE_VISITED':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.LOADING)
          );
          break;

        case 'ADD_PLAYER_TO_DATAS':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.ADD_PLAYER_TO_DATAS));
          break;

        case 'PLAYER_ADDED_TO_DATAS':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.PLAYER_ADDED_TO_DATAS, {
              detail: response.datas,
            })
          );
          break;

        case 'INIT_SESSION':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.INIT_SESSION));
          break;

        case 'INIT_GAME_SESSION':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.IN_GAME, {
              detail: response.datas,
            })
          );
          break;

        case 'IN_GAME':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.IN_GAME, {
              detail: response.datas,
            })
          );
          break;

        case 'SELECT_ACTIVE_PLAYER':
          console.log(
            "active player selected response received",
            response.datas.selectedPlayerName
          );
          break;

        case 'WAIT_NEXT_TURN':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.IN_GAME_WAITING));
          break;

        case 'IN_PROGRESS':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.IN_GAME_PROGRESSING));
          break;

        case 'GAME_OVER':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.IN_GAME_FINISHED));
          break;

        case 'ERROR':
          document.dispatchEvent(
            new CustomEvent(eventNames.DisplayEvents.ERROR),
            { detail: response.datas }
          );
          break;

        default:
          console.error("Type de message non géré:", response.displayType);
      }
    }
  }

  // Appeler le callback à la fin du traitement des messages
  if (response.displayType !== 'NONE') {
    callback();
  }
}
