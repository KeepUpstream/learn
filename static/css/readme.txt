==========================================>css 夯实基础<==========================================
font : 		font-style || font-variant || font-weight || font-size || line-height || font-family 
background: color url repeat attachment position

【元素高度】
clientHeight = 内容高度 + padding(top、bottom)
offsetHeight = 内容高度 + padding(top、bottom) + border(top、bottom) + 横向滚动条高度
scrollHeight = clientHeight + 隐藏部分的高度
jQuery获取元素高度接口
.height() = 内容高度
.innerHeight() = 内容高度 + padding(top、bottom) + 横线滚动条高度（挤占内容）
.outerHeight() = 内容高度 + padding(top、bottom) + border(top、bottom)
.outerHeight(true) = 内容高度 + padding(top、bottom) + border(top、bottom) + margin(top、bottom)

【百分比】
position:absoulte 其margin、padding、left的值相对最近父元素的width而言，而top相对高度
position:relative
position:fixed
background-size
border-radius
transform:translate
margin、padding
text-indent
line-height
font-size







==========================================>js 知识进阶<==========================================
【AJAX(Asynchronous Javascript and XML)请求】
如果您的通信流程需要从服务器端接收事件或消息数据，请考虑通过 EventSource 接口使用 server-sent events。
对于全双工的通信， WebSocket 可能是更好的选择。

判断 js 类型的方式
ES5 和 ES6 分别几种方式声明变量
闭包的概念？优缺点？
浅拷贝和深拷贝
数组去重的方法
DOM 事件有哪些阶段？谈谈对事件代理的理解
js 执行机制、事件循环
介绍下 promise.all
async 和 await
ES6 的 class 和构造函数的区别
transform、translate、transition 分别是什么属性？CSS 中常用的实现动画方式
介绍一下rAF(requestAnimationFrame)
javascript 的垃圾回收机制讲一下
对前端性能优化有什么了解？一般都通过那几个方面去优化的？

1.构造函数与实例
2.高阶函数
3.递归
4.状态管理
5.边界检查
6.原型链和继承


Dom文档加载的步骤：
解析html结构
加载外部脚本和样式表文件
解析并执行脚本
dom树构建完成
加载图片等外部文件
页面加载完毕
DOM ready、页面 Load、图片Load
DOM ready是在第四步完成之后触发
图片 Load是在第五步完成之后触发
页面Load是在第六步完成之后触发

由此可见三者执行顺序是DOM ready->图片 Load->页面 Load
domready和onload事件的区别：
原文链接：https://blog.csdn.net/weixin_43514149/article/details/108544882


