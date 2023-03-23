// content-script.js
import('./events/eventNames.js').then(module => {
  eventNames = module.default;

  // Charger le gestionnaire d'événements pour UserEvents
  import('./events/handle-user-events.js').then(({ handleUserEvents }) => {
    // Charger le gestionnaire d'événements pour DisplayEvents
    import('./events/handle-display-events.js').then(({ handleDisplayEvents }) => {
      // Charger le gestionnaire d'événements pour GameEvents
      import('./events/handle-game-events.js').then(({ handleGameEvents }) => {
        // Charger le gestionnaire d'événements pour PageEvents
        import('./events/handle-page-events.js').then(({ handlePageEvents }) => {
          
          // Ajouter des écouteurs d'événements pour les événements personnalisés
          Object.values(eventNames.PageEvents).forEach(eventName => {
            document.addEventListener(eventName, handlePageEvents);
          });

          // Émettre l'événement d'arrivée sur la page
          const arrivedEvent = new CustomEvent(eventNames.PageEvents.ARRIVED);
          document.dispatchEvent(arrivedEvent);

          // Vérifier si le chargement est terminé
          window.addEventListener('load', () => {
            // Délai de 1 seconde avant d'envoyer l'événement Loaded
            const sendLoadedEvent = () => {
              const loadedEvent = new CustomEvent(eventNames.PageEvents.LOADED);
              document.dispatchEvent(loadedEvent);
            };
            setTimeout(sendLoadedEvent, 1000); 
          });
        });
      });
    });
  });
});
