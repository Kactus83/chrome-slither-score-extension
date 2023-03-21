export function createContinueSessionOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('continue-session-overlay');
  // Ajoutez des styles CSS pour positionner l'overlay en plein écran avec un fond violet sombre

  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue Session';
  continueButton.classList.add('continue-session-button');
  // Ajoutez des styles CSS pour rendre le bouton vert clair et moderne

  continueButton.addEventListener('click', () => {
    // Appel à la fonction pour continuer la session
  });

  const newSessionButton = document.createElement('button');
  newSessionButton.textContent = 'New Session';
  newSessionButton.classList.add('new-session-button');
  // Ajoutez des styles CSS pour rendre le bouton vert clair et moderne

  newSessionButton.addEventListener('click', () => {
    // Appel à la fonction pour démarrer une nouvelle session
  });

  overlay.appendChild(continueButton);
  overlay.appendChild(newSessionButton);

  return overlay;
}
