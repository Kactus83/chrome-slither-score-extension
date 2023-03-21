function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = 1000;
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
  
    const loadingText = document.createElement('span');
    loadingText.textContent = 'Loading...';
    loadingText.style.color = 'white';
    loadingText.style.fontSize = '24px';
    loadingText.style.fontWeight = 'bold';
  
    overlay.appendChild(loadingText);
  
    return overlay;
  }
  
  export function showLoadingOverlay() {
    const overlay = createLoadingOverlay();
    document.body.appendChild(overlay);
  }
  
  export function hideLoadingOverlay() {
    const overlay = document.querySelector('div[style*="rgba(0, 0, 0, 0.8)"]');
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }
  