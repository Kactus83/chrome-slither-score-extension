export class InPlayComponent {
  constructor() {
    this.overlay = null;
  }

  init() {
    this.appendStylesheet();

    this.overlay = document.createElement('div');
    this.overlay.classList.add('in-play-overlay');

    this.observeLastScore();
  }

  insert() {
    document.body.appendChild(this.overlay);
  }

  remove() {
    if (this.overlay) {
      this.overlay.parentElement.removeChild(this.overlay);
      this.overlay = null;
    }
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/in-play/in-play.css');
    document.head.appendChild(link);
  }

  observeLastScore() {
    const lastScore = document.querySelector('#lastscore');
    if (!lastScore) return;

    let check = false;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const scoreText = lastScore.textContent.trim();
          const scoreMatch = scoreText.match(/(\d+)/);
          if (scoreMatch && !check) {
            const score = parseInt(scoreMatch[1], 10);
            observer.disconnect();
            this.remove();
            console.log("****************** EVENT IN PLAY *******************");
            const event = new CustomEvent(eventNames.GameEvents.GAME_OVER, { detail: score });
            check = true;
            document.dispatchEvent(event);
          }
        }
      });
    });

    const config = { childList: true };
    observer.observe(lastScore, config);
  }
}
