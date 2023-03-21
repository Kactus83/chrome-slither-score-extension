let eventNames;

import('./events/eventNames.js').then(module => {
  eventNames = module.default;
});


// Charger le gestionnaire d'événements
import('./events/handle-events.js').then(() => { 
  // Émettre l'événement d'arrivée sur la page
  const arrivedEvent = new CustomEvent(eventNames.PageEvents.ARRIVED);
  document.dispatchEvent(arrivedEvent);
  
  // Vérifier si le chargement est terminé
  window.addEventListener('load', () => {
    // Émettre l'événement de fin de chargement de la page
    const loadedEvent = new CustomEvent(eventNames.PageEvents.LOADED);
    document.dispatchEvent(loadedEvent);
  });
});
