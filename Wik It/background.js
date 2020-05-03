const contextMenuItem = {
  type: 'normal',
  id: 'wikiit',
  title: 'Wiki It',
  contexts: ['selection'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (event) {
  if (event.selectionText) {
    var selection = event.selectionText.trim();
    var wikiURL = `https://ru.wikipedia.org/wiki/${selection}`;
    chrome.tabs.create({ url: wikiURL }); // Открытие во вкладке
  }
});
