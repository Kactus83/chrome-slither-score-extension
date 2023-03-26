import eventNames from '../../../events/eventNames.js';

export class ContinueSessionComponent {
  constructor() {
    this.overlay = null;
    this.continueButton = null;
    this.newSessionButton = null;
  }

  init() {
    this.appendStylesheet();

    this.overlay = document.createElement('div');
    this.overlay.classList.add('continue-session-overlay');

    const tipsDiv = document.getElementById("tips");
    tipsDiv.style.display = 'none';

    const existingIframe = document.querySelector("iframe[src='/social-box/']");
    if (existingIframe) {
      existingIframe.style.display = "none";
    }

    this.continueButton = document.createElement('button');
    this.continueButton.textContent = 'Continue Session';
    this.continueButton.classList.add('continue-session-button');

    this.newSessionButton = document.createElement('button');
    this.newSessionButton.textContent = 'New Session';
    this.newSessionButton.classList.add('new-session-button');

    this.overlay.appendChild(this.continueButton);
    this.overlay.appendChild(this.newSessionButton);
  }

  insert() {
    this.continueButton.addEventListener('click', this.handleContinueButtonClick);
    this.newSessionButton.addEventListener('click', this.handleNewSessionButtonClick);
    document.body.appendChild(this.overlay);
  }

  remove() {
    this.continueButton.removeEventListener('click', this.handleContinueButtonClick);
    this.newSessionButton.removeEventListener('click', this.handleNewSessionButtonClick);
    if (this.overlay) {
      this.overlay.parentElement.removeChild(this.overlay);
      this.overlay = null;
    }
  }

  appendStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('content/gui/modules/continue-session/continue-session.css');
    document.head.appendChild(link);
  }

  handleContinueButtonClick = () => {
    this.remove();
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.RESUME_SESSION));
  };

  handleNewSessionButtonClick = () => {
    this.remove();
    document.dispatchEvent(new CustomEvent(eventNames.UserEvents.LAUNCH_INIT_SESSION));
  };
}
