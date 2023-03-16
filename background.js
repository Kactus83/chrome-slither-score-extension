import { loadLocalDatas } from './utils/local-datas.js';

chrome.runtime.onInstalled.addListener(function() {
  loadLocalDatas();
});


