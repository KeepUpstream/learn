function say (value) {
    console.log(value);
}
console.log("%c执行方法say","font-weight:bold;color:blue;font-size:16px;")
console.log(say);
console.log("%c执行方法say('hi js.')","font-weight:bold;color:blue;font-size:16px;")
console.log(say('hi js.'));


function execute (someFunction, value) {
    someFunction(value);
}
console.log("%c执行方法execute(say, 'hi js.')","font-weight:bold;color:blue;font-size:16px;")
execute(say, 'hi js.');
console.log("%c执行方法execute(function(value){console.log(value);}, 'hi js.')","font-weight:bold;color:blue;font-size:16px;")
execute(function(value){console.log(value);}, 'hi js.');

function fn2(arg1, arg2, callback){
 var num = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
 callback(num);
}
console.log("%c执行方法fn2","font-weight:bold;color:blue;font-size:16px;")
fn2(10, 20, function(num){
 console.log("Callback called! Num: " + num); 
});　　　　

console.log("%c执行方法--ajax回调用例","font-weight:bold;color:blue;font-size:16px;")
function fn(url, callback){
 var httpRequest;　　　　//创建XHR
 httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() :　　　//针对IE进行功能性检测
　　　　window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : undefined;
  
 httpRequest.onreadystatechange = function(){
  if(httpRequest.readystate === 4 && httpRequest.status === 200){　　//状态判断
   callback.call(httpRequest.responseXML); 
  }
 };
 httpRequest.open("GET", url);
 httpRequest.send();
}
 
fn("readme.txt", function(){　　　　
 console.log(this); 　　//此语句后输出
});
 
console.log("this will run before the above callback.");　　//此语句先输出 

//一个同步(阻塞)中使用回调的例子，目的是在func1代码执行完成后执行func2。
var func1=function(callback){
  //do something.
  (callback && typeof(callback) === "function") && callback();
}
 
func1(func2);
  var func2=function(){
}


//异步回调的例子：
$(document).ready(callback);
 
$.ajax({
 url: "test.html",
 context: document.body
}).done(function() { 
 $(this).addClass("done");
}).fail(function() { alert("error");
}).always(function() { alert("complete"); 
});

//注意的是，ajax请求确实是异步的,不过这请求是由浏览器新开一个线程请求,当请求的状态变更时,如果先前已设置回调,这异步线程就产生状态变更事件放到 JavaScript引擎的处理队列中等待处理。