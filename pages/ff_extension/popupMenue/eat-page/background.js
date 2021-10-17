browser.contextMenus.create({
  id: "eat-page",
  title: "Eat this page"
});

function messageTab(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    replacement: "Message from the add-on!"
  });
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "eat-page") {
      browser.tabs.executeScript({
      file: "eat-page/page-eater.js"
    });
    
    var querying = browser.tabs.query({
      active: true,
      currentWindow: true
    });
    querying.then(messageTab);
  }
});

