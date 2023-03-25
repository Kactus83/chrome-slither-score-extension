import { handleMessage } from './messages/handle-messages.js';

const handleRequest = async (request, tabId) => {
  try {
    return await handleMessage(request);
  } catch (error) {
    console.error('Error in onMessage:', error);
    return { displayType: 'ERROR', datas: { error: error.message } };
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Request received:', request);
  const tabId = sender.tab.id;
  handleRequest(request, tabId).then(sendResponse);
  return true;
});