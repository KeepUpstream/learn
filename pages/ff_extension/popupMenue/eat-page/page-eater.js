function eatPage(request, sender, sendResponse) {
  document.body.textContent = "";

  var header = document.createElement('h1');

  header.textContent = request.replacement;
  document.body.appendChild(header);
}

browser.runtime.onMessage.addListener(eatPage);