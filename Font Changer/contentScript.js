chrome.runtime.sendMessage({ todo: 'showPageAction' });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  document.body.style.background = message.newColor;
});
