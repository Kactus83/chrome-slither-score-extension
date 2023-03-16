export function createAddPlayerForm() {
    // Création de l'élément de formulaire
    const form = document.createElement('form');
    form.id = 'add-player-form';
  
    // Création du champ de texte pour le nom du joueur
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.placeholder = 'Nom du joueur';
    form.appendChild(input);
  
    // Création du bouton pour ajouter le joueur
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Ajouter';
    form.appendChild(button);
  
    return form;
}
  