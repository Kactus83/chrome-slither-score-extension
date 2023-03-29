export class ScoreCounter {
  constructor() {
    this.scoreContainer = null;
    this.observer = null;
    this.updateScheduled = false;
  }

  init() {
    this.createScoreContainer();
  }

  createScoreContainer() {
    this.scoreContainer = document.createElement('div');
    this.scoreContainer.classList.add('score-container');

    const scoreText = document.createElement('span');
    scoreText.classList.add('score-text');
    this.scoreContainer.appendChild(scoreText);

    const rankText = document.createElement('span');
    rankText.classList.add('rank-text');
    this.scoreContainer.appendChild(rankText);
  }

  insert() {
    document.body.appendChild(this.scoreContainer);
    this.hideOriginalScore();
  }

  remove() {
    if (this.scoreContainer && this.scoreContainer.parentElement) {
      this.scoreContainer.parentElement.removeChild(this.scoreContainer);
    }
  }

  observe() {
    const scoreDiv = document.querySelector('div[style*="left: 8px; bottom: 4px;"]');
    if (!scoreDiv) return;

    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          this.updateDisplay(scoreDiv);
        }
      });
    });

    const config = { childList: true };
    this.observer.observe(scoreDiv, config);
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  hideOriginalScore() {
    const originalScoreDiv = document.querySelector('div[style*="left: 8px; bottom: 4px;"]');
    if (originalScoreDiv) {
      originalScoreDiv.style.display = 'none';
    }
  }

  updateDisplay(scoreDiv) {
    if (!this.updateScheduled) {
      this.updateScheduled = true;
  
      setTimeout(() => {
        const scoreText = scoreDiv.textContent.trim();
        const scoreMatch = scoreText.match(/Votre longueur: (\d+)/);
        const rankMatch = scoreText.match(/Ton rang: (\d+) de (\d+)/);
  
        if (scoreMatch) {
          const score = parseInt(scoreMatch[1], 10);
          this.scoreContainer.querySelector('.score-text').textContent = score;
        }
  
        if (rankMatch) {
          const rank = parseInt(rankMatch[1], 10);
          const totalPlayers = parseInt(rankMatch[2], 10);
          this.scoreContainer.querySelector('.rank-text').textContent = `${rank} / ${totalPlayers}`;
        }
  
        this.updateScheduled = false;
      }, 1000);
    }
  }  
}

export default ScoreCounter;
