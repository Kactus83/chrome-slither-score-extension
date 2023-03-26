export class ErrorOverlay {
  constructor() {
    this.overlay = null;
  }

  init() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'error-overlay';
    this.overlay.style.position = 'fixed';
    this.overlay.style.top = '0';
    this.overlay.style.left = '0';
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    this.overlay.style.zIndex = '10000';
    this.overlay.style.display = 'flex';
    this.overlay.style.flexDirection = 'column';
    this.overlay.style.alignItems = 'center';
    this.overlay.style.justifyContent = 'center';
    this.overlay.style.color = 'white';
    this.overlay.style.fontSize = '32px';
    this.overlay.innerText = 'Error';

    const closeButton = document.createElement('button');
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.innerText = 'Close';

    closeButton.addEventListener('click', () => {
      this.remove();
      location.reload();
    });

    this.overlay.appendChild(closeButton);
  }

  insert() {
    if (!this.overlay) {
      this.init();
    }
    document.body.appendChild(this.overlay);
  }

  remove() {
    if (this.overlay) {
      this.overlay.parentElement.removeChild(this.overlay);
      this.overlay = null;
    }
  }
}
