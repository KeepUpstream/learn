function openPage() {
  browser.tabs.create({
    url: "https://weibo.com/"
  });
}
//文件用来监听浏览器单击事件
browser.browserAction.onClicked.addListener(openPage);