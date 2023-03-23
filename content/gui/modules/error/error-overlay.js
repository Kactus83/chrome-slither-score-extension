export function createErrorOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'error-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.color = 'white';
  overlay.style.fontSize = '32px';
  overlay.innerText = 'Error';

  // Créer un bouton "Close"
  const closeButton = document.createElement('button');
  closeButton.style.marginTop = '20px';
  closeButton.style.padding = '10px 20px';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.innerText = 'Close';

  // Ajouter un gestionnaire d'événements pour actualiser la page lorsqu'on clique sur le bouton "Close"
  closeButton.addEventListener('click', () => {
    location.reload();
  });

  // Ajouter le bouton "Close" à l'overlay d'erreur
  overlay.appendChild(closeButton);

  return overlay;
}

export function removeErrorOverlay() {
  const overlay = document.getElementById('error-overlay');
  if (overlay) {
    overlay.parentElement.removeChild(overlay);
  }
}
