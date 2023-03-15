import { LocalDatas } from './models.js';

function loadLocalDatas() {
  chrome.storage.local.get('localDatas', function(data) {
      let localDatas = data.localDatas;
      if (!localDatas) {
          localDatas = new LocalDatas();
          chrome.storage.local.set({localDatas: localDatas});
      }
      return localDatas;
  });
}

loadLocalDatas();

