export function createContinueSessionOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('continue-session-overlay');
  // Ajoutez des styles CSS pour positionner l'overlay en plein écran avec un fond violet sombre

  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue Session';
  continueButton.classList.add('continue-session-button');
  // Ajoutez des styles CSS pour rendre le bouton vert clair et moderne

  continueButton.addEventListener('click', () => {
    // Emits the "user:resumeSession" event
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.RESUME_SESSION));
  });

  const newSessionButton = document.createElement('button');
  newSessionButton.textContent = 'New Session';
  newSessionButton.classList.add('new-session-button');
  // Ajoutez des styles CSS pour rendre le bouton vert clair et moderne

  newSessionButton.addEventListener('click', () => {
    // Emits the "user:initializeSession" event
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.INITIALIZE_SESSION));
  });

  overlay.appendChild(continueButton);
  overlay.appendChild(newSessionButton);

  return overlay;
}

export function removeContinueSessionOverlay() {
  const overlay = document.querySelector('.continue-session-overlay');
  if (overlay) {
    overlay.parentElement.removeChild(overlay);
  }
}


