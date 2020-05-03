const contextMenuItem = {
  type: 'normal',
  id: 'cambridge',
  title: 'Cambridge It',
  contexts: ['selection'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (event) {
  if (event.menuItemId === 'cambridge' && event.selectionText) {
    var selection = event.selectionText.trim();
    var cambridgeURL = `https://dictionary.cambridge.org/dictionary/english-russian/${selection}`;
    var createData = {
      url: cambridgeURL,
      type: 'popup',
    };
    chrome.windows.create(createData, function (window) {
      setTimeout(function () {
        chrome.windows.remove(window.id);
      }, 5000);
    });
  }
});
