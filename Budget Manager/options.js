document.addEventListener('DOMContentLoaded', function () {
  const setButton = document.getElementById('set-limit');
  const resetButton = document.getElementById('reset-total');

  chrome.storage.sync.get(['limit'], function (result) {
    const limit = document.getElementById('limit');
    limit.value = result.limit;
  });

  setButton.addEventListener('click', function () {
    const limit = document.getElementById('limit').value;
    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function () {
        close();
      });
    }
  });

  resetButton.addEventListener('click', function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      const notificationOptions = {
        type: 'basic',
        iconUrl: 'icon128.png',
        title: 'Total reset!',
        message: 'Total has been reset!',
      };
      chrome.notifications.create('limitnotif', notificationOptions);
    });
  });
});
