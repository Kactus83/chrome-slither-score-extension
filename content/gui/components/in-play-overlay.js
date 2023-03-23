// in-play-overlay.js
export function createInPlayOverlay() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/components/in-play-overlay.css');
    document.head.appendChild(link);
  
    const inPlayDiv = document.createElement('div');
    inPlayDiv.classList.add('in-play-overlay');
  
    // Ajoutez le contenu de l'overlay ici
  
    return inPlayDiv;
  }
  
  export function removeInPlayOverlay() {
    const inPlayDiv = document.querySelector('.in-play-overlay');
    if (inPlayDiv) {
      inPlayDiv.parentNode.removeChild(inPlayDiv);
    }
  }
  