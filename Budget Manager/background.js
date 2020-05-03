const contextMenuItem = {
  type: 'normal',
  id: 'spendmany',
  title: 'Spend Many',
  contexts: ['image'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (e) {
  if (e.menuItemId === 'spendmany' && e.selectionText !== '') {
    if (!isNaN(e.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], function (budget) {
        let newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(e.selectionText);

        chrome.storage.sync.set({ total: newTotal }, function () {
          if (budget.limit < newTotal) {
            const notificationOptions = {
              type: 'basic',
              iconUrl: 'icon128.png',
              title: 'Limit reached!',
              message: "Sorry! You've reached limit!",
            };
            chrome.notifications.create('limitnotif', notificationOptions);
          }
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.total.newValue === 0) {
    chrome.browserAction.setBadgeText({ text: 'Zero' });
  } else {
    chrome.browserAction.setBadgeText({ text: changes.total.newValue.toString() });
  }
});
