var pattern = "https://www.baidu.com/*";

function redirect(requestDetails) {
  console.log("Redirecting: " + requestDetails.url);
  return {
    redirectUrl: "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif"
  };
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:[pattern], types:["image"]},
  ["blocking"]
);