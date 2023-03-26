import eventNames from '../../../../events/eventNames.js';

export class LoginDivObserver {
  constructor() {
    this.loginDiv = document.querySelector('#login');
    this.inProgressTriggered = false;
    this.eventDispatched = false;
    this.observer = null;
  }

  observe() {
    if (!this.loginDiv) return;

    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (!this.inProgressTriggered && mutation.type === 'attributes' && mutation.attributeName === 'style' && this.loginDiv.style.display === 'none') {
          this.inProgressTriggered = true;
          this.stop();
          this.triggerInitInProgress();
        }
      });
    });

    const config = { attributes: true };
    this.observer.observe(this.loginDiv, config);

    return this.observer;
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  triggerInitInProgress() {
    const selectedPlayerNameElement = document.querySelector('.player-select select');
    const selectedPlayerName = selectedPlayerNameElement ? selectedPlayerNameElement.value : null;

    if (!this.eventDispatched && selectedPlayerName) {
      console.log("****************** EVENT INIT IN_PROGRESS *******************");
      const event = new CustomEvent(eventNames.UserEvents.INIT_IN_PROGRESS, { detail: selectedPlayerName });
      document.dispatchEvent(event);
      this.eventDispatched = true;
    }
  }
}
