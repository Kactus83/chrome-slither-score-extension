let eventNames, showLoadingScreen, hideLoadingScreen, initLocalDatas;
let mainGuiFunctions;

import('./eventNames.js').then(module => {
  eventNames = module.default;

  import('../gui/main-gui.js').then(module => {
    mainGuiFunctions = module;
    showLoadingScreen = module.showLoadingScreen;
    hideLoadingScreen = module.hideLoadingScreen;

    import('./send-messages.js').then(module => {
      initLocalDatas = module.initLocalDatas;

      document.addEventListener(eventNames.BackgroundEvents.WORKING, () => {
        showLoadingScreen();
      });

      document.addEventListener(eventNames.BackgroundEvents.LOADING, () => {
        hideLoadingScreen();
      });

      document.addEventListener(eventNames.BackgroundEvents.NEW_LOCAL_DATA, (event) => {
        // Mettre à jour les localDatas avec les données reçues
        localDatas = { ...event.detail };
      });

      document.addEventListener(eventNames.BackgroundEvents.ERROR, (event) => {
        // Afficher l'overlay d'erreur avec le message d'erreur
        showErrorOverlay(event.detail);
      });

      // Réagir à l'arrivée sur la page en affichant l'overlay de chargement
      document.addEventListener(eventNames.PageEvents.ARRIVED, () => {
        showLoadingScreen();
      });

      // Enlever l'overlay de chargement une fois que la page est chargée
      document.addEventListener(eventNames.PageEvents.LOADED, async () => {
        hideLoadingScreen();

        // Obtenir les données depuis le backend
        await initLocalDatas();
      });

      // Ajouter un gestionnaire d'événements pour DATA_INITIALIZED
      document.addEventListener(eventNames.BackgroundEvents.DATA_INITIALIZED, (event) => {
        // Utiliser les fonctions de mainGuiFunctions ici pour gérer l'événement
        // par exemple: mainGuiFunctions.someFunction();
      });

    });
  });
});

// Stocker les localDatas
let localDatas = {};
let inPlay = false;
