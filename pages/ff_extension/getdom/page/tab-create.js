// browser.runtime.onMessage.addListener((message) => {
//     if (message.command === "link") {
//        	browser.tabs.create({
// 		    url: "https://www.baidu.com"
// 		});
//     } 
// });
var namespace;
var browser_type = myBrowser(); console.log("background:"+browser_type);
if(browser_type =="Chrome"){
	namespace=chrome;
}else if(browser_type =="FF"){
	namespace=browser;
}

//监听content_script发来消息
namespace.runtime.onMessage.addListener(notify);
//从扩展页面发消息给content scripts
namespace.tabs.query(
    {active: true, currentWindow: true}, 
    function(tabs) {
        namespace.tabs.sendMessage(
            tabs[0].id, 
            {greeting: "hello"}, 
            function(response) {
                console.log(response.farewell);
    	});
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

function notify(message) {
	console.log("enter notify function.");
	var command = message.command;
	if(command=="nofication"){
		namespace.notifications.create({
		    "type": "basic",
		    "iconUrl": namespace.extension.getURL("icons/icon.png"),
		    "title": "通知！ 重大通知!",
		    "message": message.content
		  });
	}else if(command=="link"){
		  namespace.tabs.create({
		  	 url:message.content
		  });
	}else if(command=="img"){
		namespace.tabs.create({
		  	 url:message.content
		  });

	}else{
		namespace.notifications.create({
		    "type": "basic",
		    "iconUrl": namespace.extension.getURL("icons/beauty.jpg"),
		    "title": "通知！",
		    "message": message.content
		});
		console.log(message.content);
		namespace.tabs.executeScript({code:'console.log("message:",message.content);'})
		.then(backMessage)
		.catch(reportExecuteScriptError);
	}
}

function backMessage(){
	console.error("success");
}
function reportExecuteScriptError(error) {
  console.error('Failed to execute script');
}