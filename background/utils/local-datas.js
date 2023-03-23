import { LocalDatas } from '../../models/models.js';

export async function loadLocalDatas() {
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
  
export async function saveLocalDatas(localDatas) {
  console.log("saving local datas : ");
  console.log(localDatas)
  chrome.storage.local.set({localDatas: localDatas});
}