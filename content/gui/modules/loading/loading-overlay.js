export class LoadingOverlay {
  constructor() {
    this.overlay = null;
  }

  init() {
    this.overlay = document.createElement('div');
    this.overlay.setAttribute('data-loading-overlay', '');
    this.overlay.style.position = 'fixed';
    this.overlay.style.left = 0;
    this.overlay.style.top = 0;
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    this.overlay.style.zIndex = 1000;
    this.overlay.style.display = 'flex';
    this.overlay.style.justifyContent = 'center';
    this.overlay.style.alignItems = 'center';

    const loadingText = document.createElement('span');
    loadingText.textContent = 'Loading...';
    loadingText.style.color = 'white';
    loadingText.style.fontSize = '24px';
    loadingText.style.fontWeight = 'bold';

    this.overlay.appendChild(loadingText);
  }

  insert() {
    if (!this.overlay) {
      this.init();
    }
    document.body.appendChild(this.overlay);
  }

  remove() {
    if (this.overlay) {
      document.body.removeChild(this.overlay);
      this.overlay = null;
    }
  }
}
