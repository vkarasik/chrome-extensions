chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.todo === 'showPageAction') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabID = tabs[0].id;
      chrome.pageAction.show(tabID);
    });
  }
});

function showAlert(obj) {
  alert(JSON.stringify(obj));
}
