const contextMenuItem = {
  type: 'normal',
  id: 'speakit',
  title: 'Speak It',
  contexts: ['selection'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (event) {
  if (event.menuItemId === 'speakit' && event.selectionText) {
    var selection = event.selectionText.trim();
    chrome.tts.speak(selection, { lang: 'en', rate: 0.7 });
  }
});
