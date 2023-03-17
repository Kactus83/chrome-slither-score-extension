export function createToggleFormButton(playerForm) {
    const toggleFormButton = document.createElement('button');
    toggleFormButton.textContent = 'Ajouter un joueur';
    toggleFormButton.onclick = () => {
      playerForm.style.display = playerForm.style.display === 'none' ? 'block' : 'none';
    };
    return toggleFormButton;
  }
  