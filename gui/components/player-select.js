export function createPlayerSelect(localDatas) {
    const select = document.createElement('select');
    select.id = 'playerSelect';
  
    if (localDatas.players.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.text = 'Aucun joueur enregistré';
      select.add(option);
    } else {
      localDatas.players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.name;
        option.text = player.name;
        select.add(option);
      });
    }
    return select;
  }
  