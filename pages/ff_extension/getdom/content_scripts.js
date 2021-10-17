//document.body.style.border = "solid 10px orange";

//判断浏览器类型,从而确定命名空间使用哪个
var namespace;
var browser_type = myBrowser(); console.log("content_scripts:"+browser_type);
if(browser_type =="Chrome"){
	namespace = chrome;
}else if(browser_type =="FF"){
	namespace = browser;
}


//--------------------------------------------------------------------injected js
var s = document.createElement('script');
s.src = namespace.extension.getURL('js/operate.js');
(document.head || document.documentElement).appendChild(s);
//注入的脚本会在页面上显示该<script>标签
// s.onload = function() {
//     this.parentNode.removeChild(this);
// };


//--------------------------------------------------------------------content_scripts 
//脚本之间不能相互访问
// console.log(currentPage());

//注册页面监听事件
window.addEventListener("click",newTab);

//注册injected脚本消息监听事件
window.addEventListener("message", receiveMessage, false);

//注册扩展脚本[background|popup]消息监听事件
namespace.runtime.onMessage.addListener(logMessage);
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
	console.log(sender.tab ?
	              "from a content script:" + sender.tab.url :
	               "from the extension");
	if (request.greeting == "hello")//判断是否为要处理的消息
	    sendResponse({farewell: "goodbye"});
});



//判断浏览器类型
function myBrowser(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  		return "Chrome";
 	}
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
//监听页面事件，发出消息
function newTab(e){
	console.log("e.target.tagName:"+e.target.tagName);
	var tag = e.target.tagName;
	if(tag=="DIV"){
		console.log("is div");
		namespace.runtime.sendMessage({
			command:"nofication",
			"content":"这是一个div。"
		});
	}else if(tag=="A"){
		console.log("is a");
		namespace.runtime.sendMessage({
			command:"link",
			"content":"https://www.baidu.com"
		});
	}else if(tag=="IMG"){
		console.log("is img");
		namespace.runtime.sendMessage({
			command:"img",
			"content":"icons/beauty.jpg"
		});
	}else{
		console.log("is "+tag);
		namespace.runtime.sendMessage({
			command:"else",
			"content":tag
		});
	}
}

function receiveMessage(event)
{
  console.log("收到注入脚本"+ event.source +"发来消息："+event.data);
  event.source.postMessage("hi there yourself!  the secret response is: rheeeeet!",event.origin);
}

function logMessage(message){
	alert(message.content);
}
//备注
// content_scripts可使用standard DOM APIS，限制使用的webExtensions API:
// From extension:
//     getURL()
//     inIncognitoContext
// From runtime:
//     connect()
//     getManifest()
//     getURL()
//     onConnect
//     onMessage
//     sendMessage()
// From i18n:
//     getMessage()
//     getAcceptLanguages()
//     getUILanguage()
//     detectLanguage()
// 所有 storage.