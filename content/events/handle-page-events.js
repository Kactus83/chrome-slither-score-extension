import eventNames from './eventNames.js';

export function handlePageEvents(event) {
  console.log("handling page event : ");
  console.log(event);
  
  switch (event.type) {
    case eventNames.PageEvents.ARRIVED:
      import('../messages/send-messages.js').then(({ sendPageVisited }) => {
        sendPageVisited();
      });
      break;

    case eventNames.PageEvents.LOADED:
      import('../messages/send-messages.js').then(({ sendPageLoaded }) => {
        sendPageLoaded();
      });
      break;

    default:
      console.error('Unhandled PageEvent:', event.type);
  }
}
