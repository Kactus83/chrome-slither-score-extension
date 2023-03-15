function loadLocalDatas() {
    let localDatas = JSON.parse(localStorage.getItem('localDatas'));
    if (!localDatas) {
      localDatas = new LocalDatas();
      localStorage.setItem('localDatas', JSON.stringify(localDatas));
    }
    return localDatas;
  }

  
  loadLocalDatas();