document.addEventListener('DOMContentLoaded', function () {
  let colorPicker = document.getElementById('font-color');

  colorPicker.addEventListener('change', function (e) {
    let color = colorPicker.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabID = tabs[0].id;
      chrome.tabs.sendMessage(tabID, { todo: 'changeColor', newColor: color });
    });
  });
});
