import { LocalDatas } from '../models.js';

export function loadLocalDatas() {
    return new Promise((resolve) => {
      chrome.storage.local.get('localDatas', function (data) {
        let localDatas = data.localDatas;
        if (!localDatas) {
          localDatas = new LocalDatas();
          chrome.storage.local.set({ localDatas: localDatas });
        }
        resolve(localDatas);
      });
    });
}
  
export function saveLocalDatas(localDatas) {
    chrome.storage.local.set({localDatas: localDatas});
}