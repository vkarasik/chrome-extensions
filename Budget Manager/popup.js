document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('send-amount');
  const total = document.getElementById('total');
  const limit = document.getElementById('limit');

  chrome.storage.sync.get(['total', 'limit'], function (budget) {
    if (budget.total) {
      total.innerHTML = budget.total;
    }
    if (budget.limit) {
      limit.innerHTML = budget.limit;
    }
  });

  button.addEventListener('click', function () {
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
      let newTotal = 0;
      let amount = document.getElementById('amount');

      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      if (amount) {
        newTotal += parseInt(amount.value);
      }

      chrome.storage.sync.set({ total: newTotal }, function () {
        if (budget.limit < newTotal) {
          const notificationOptions = {
            type: 'progress',
            iconUrl: 'icon128.png',
            title: 'Limit reached!',
            message: "Sorry! You've reached limit!",
            progress: 90,
          };
          chrome.notifications.create('limitnotif', notificationOptions);
        }
      });

      total.innerHTML = newTotal;
      amount.value = '';
    });
  });
});
