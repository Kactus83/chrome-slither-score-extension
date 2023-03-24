function observeLastScore() {
  const lastScore = document.querySelector('#lastscore');
  if (!lastScore) return;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const scoreText = lastScore.textContent.trim();
        const scoreMatch = scoreText.match(/(\d+)/);
        if (scoreMatch) {
          const score = parseInt(scoreMatch[1], 10);
          observer.disconnect();
          removeInPlayOverlay();
          const event = new CustomEvent(eventNames.GameEvents.GAME_OVER, { detail: score });
          document.dispatchEvent(event);
        }
      }
    });
  });

  const config = { childList: true };
  observer.observe(lastScore, config);
}

function appendStylesheet() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content/gui/modules/in-play/in-play-overlay.css');
  document.head.appendChild(link);
}

export function createInPlayOverlay() {

  console.log("try to create in play component");
  
  const existingOverlay = document.querySelector('.in-play-overlay');
  if (existingOverlay) {
    console.error('Error: In play component already exists.');
    return null;
  }

  appendStylesheet();

  const inPlayDiv = document.createElement('div');
  inPlayDiv.classList.add('in-play-overlay');

  // Ajoutez le contenu de l'overlay ici

  observeLastScore();

  return inPlayDiv;
}

export function removeInPlayOverlay() {
  const inPlayDiv = document.querySelector('.in-play-overlay');
  if (inPlayDiv) {
    inPlayDiv.parentNode.removeChild(inPlayDiv);
  }
}
