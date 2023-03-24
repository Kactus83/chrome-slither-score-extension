export function createContinueSessionOverlay() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/modules/continue-session/continue-session-overlay.css');
  document.head.appendChild(link);

  const overlay = document.createElement('div');
  overlay.classList.add('continue-session-overlay');

  const tipsDiv = document.getElementById("tips");
  tipsDiv.style.display = 'none'; // Masquer la div "tips"
    
  const existingIframe = document.querySelector("iframe[src='/social-box/']");
  if (existingIframe) {
    existingIframe.style.display = "none";
  }
  
  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue Session';
  continueButton.classList.add('continue-session-button');

  continueButton.addEventListener('click', () => {
    removeContinueSessionOverlay()
    // Emits the "user:resumeSession" event
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.RESUME_SESSION));
  });

  const newSessionButton = document.createElement('button');
  newSessionButton.textContent = 'New Session';
  newSessionButton.classList.add('new-session-button');

  newSessionButton.addEventListener('click', () => {
    removeContinueSessionOverlay()
    // Emits the "user:initializeSession" event
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.LAUNCH_INIT_SESSION));
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
