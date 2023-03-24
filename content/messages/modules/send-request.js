import { onBackgroundMessage } from "./handle-messages.js";

export async function sendRequest(request) {
    console.log("sending request : ");
    console.log(request);
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(request, (response) => {
        onBackgroundMessage(response, () => {
          resolve(response);
        });
      });
    });
  }