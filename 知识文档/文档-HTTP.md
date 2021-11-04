# 一、网络通信原理

### 网络七层模型（OSI）

实际应用中是网络四层模型：

![网络模型-四层](image-http\网络模型-四层.png)

HTTP永远是客户端发起请求，服务器送回响应。这样就限制了使用HTTP协议，无法实现在客户端没有发起请求的时候，服务器将消息推送给客户端。

一次HTTP操作称为一个事物，其工作过程可分为4步：

- 首先客户端与服务器需要建立连接（三次握手）

- 建立连接后，客户端发送一个请求给服务器，请求头格式为：统一资源标示符（URL）、协议版本号，后边是MIME信息（如请求修饰符、客户端信息等）

- 服务器接到请求后，给予相应的响应信息，其格式为：状态行（包括协议版本号、成功或错误的状态码，后边是MIME信息（包括服务器信息、实体信息等））

- 客户端接收服务器返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接（四次挥手）

  如果在以上过程中的某一边出现错误，那么产生的错误信息将返回到客户端，由显示屏输出。对于用户来说，这些过程是HTTP自己完成的，用户只要点击连接，等待信息显示就可以了。

### 1. HTTP请求头和响应头

#### 1.1 请求

![http-request-header](\image-http\http-request-header.webp)

```js
(1) method请求方法//常见的值有:GET HEAD POST DELETE PUT TRACE FETCH OPTIONS
(2) url //与报文头的host拼接在一起是完整的请求url
(3) 协议名称和版本号
(4) 报文头，有若干个属性，形式为key:value，服务端据此获取客户端信息
(5) 报文体//将页面表单中组件值通过param1=value&param2=val2的键值对形式编码成一个格式化串，他承载多个请求参数的数据，不但报文头可以传递请求参数，URL也可以通过“/chapter15/user.html? param1=value1&param2=value2”的方式传递数值
```

```js
:authority: sensors.ibreader.com
:method: GET
:path: /sa.gif?project=jianshu&data=eyJkaXN0aW5jdF9pZCI6IjE3YzZkZmM3NGMwNDE4LTBhM2IzYjdiYWZlZjQxLTVmMWQzNTFjLTIwNzM2MDAtMTdjNmRmYzc0YzI5Y2IiLCJsaWIiOnsiJGxpYiI6ImpzIiwiJGxpYl9tZXRob2QiOiJjb2RlIiwiJGxpYl92ZXJzaW9uIjoiMS4xNC4xNCJ9LCJwcm9wZXJ0aWVzIjp7IiRzY3JlZW5faGVpZ2h0IjoxMDgwLCIkc2NyZWVuX3dpZHRoIjoxOTIwLCIkbGliIjoianMiLCIkbGliX3ZlcnNpb24iOiIxLjE0LjE0IiwiJGxhdGVzdF90cmFmZmljX3NvdXJjZV90eXBlIjoi6Ieq54S25pCc57Si5rWB6YePIiwiJGxhdGVzdF9zZWFyY2hfa2V5d29yZCI6IuacquWPluWIsOWAvCIsIiRsYXRlc3RfcmVmZXJyZXIiOiJodHRwczovL3d3dy5iYWlkdS5jb20vbGluayIsInBsYXRmb3JtIjoid2ViIiwic2l0ZSI6InNoYWtlc3BlYXJlIiwicGxhY2UiOiLmlofnq6DpobUiLCJwYWdlX3RpdGxlIjoiSFRUUOivt%2BaxguWktOWSjOWTjeW6lOWktOivpuinoyAtIOeugOS5piIsIiRpc19maXJzdF9kYXkiOmZhbHNlfSwiYW5vbnltb3VzX2lkIjoiMTdjNmRmYzc0YzA0MTgtMGEzYjNiN2JhZmVmNDEtNWYxZDM1MWMtMjA3MzYwMC0xN2M2ZGZjNzRjMjljYiIsInR5cGUiOiJ0cmFjayIsImV2ZW50IjoicGNfbHVja3doZWVsX3JpZ2h0X2Nsb3NlIiwiX3RyYWNrX2lkIjo1MzEwMjY1NzV9&ext=crc%3D-900202898
:scheme: https
//accept 告诉服务端，客户端接收什么类型的响应
accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
//acecept-encoding 告诉服务器能接受什么编码格式，包括字符编码，压缩形式等
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
//cache-control 对缓存进行控制，如一个请求希望响应的内容在客户端缓存一年或不可以被缓存
cache-control: no-cache
pragma: no-cache
//referer 标识请求的源资源地址，即是从哪个url进来的
referer: https://www.jianshu.com/
//host 执行请求资源所在主机和端口
sec-ch-ua: "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: image
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
//user-agent 告诉服务端客户端使用的操作系统、浏览器版本和名称
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36
```

#### 1.2 响应

![http-response-header](\image-http\http-response-header.webp)

```js
//响应报文与请求报文一样，由三个部分组成（响应行，响应头和响应体）
（1）报文协议及版本
（2）状态码及状态描述
（3）响应报文头，由多个属性组成
（4）响应报文体，即客户端要的数据
```

![http请求头和相应头](\image-http\http请求头和相应头.png)

详细了解请求过程：

http://www.blogjava.net/zjusuyong/articles/304788.html

**HTTP状态码**

| 状态码  | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| 100~199 | 表示成功接受请求，要求客户端继续提交下一次请求才能完成整改处理过程 |
| 200~299 | 表示成功接收请求并已完成整个处理过程                         |
| 300~399 | 未完成请求，客户需要进一步虚化请求                           |
| 400~499 | 客户端的请求有错误                                           |
| 500~599 | 服务器端出现错误                                             |

#### 1.3 发展历程

https://zhuanlan.zhihu.com/p/293378068

#### 1.4 web中间件

1. 简介
   https://blog.csdn.net/qq_33163046/article/details/113363426
   https://zhuanlan.zhihu.com/p/337954896
2. 存在的漏洞
   https://www.cnblogs.com/wjw-zm/p/11802615.html

### 2. 跨域



### 3. WebSocket

https://www.ruanyifeng.com/blog/2017/05/websocket.html

#### 3.1 HTTP协议缺陷

​		通信只能由客户端发起，做不到服务器主动向客户端推送消息。这种单项请求的特点，使得在服务器由连续的状态变化时，客户端要获知就非常麻烦，只能采用“轮询”方式，即每隔一段时间就发出一个询问，了解服务器有没有新的信息。

典型场景：聊天室

​		轮询效率低，非常浪费资源。（因为必须不停连接，捉着HTTP连接始终打开。）

#### 3.2 websocket简介

​		WebSocket协议诞生于2008年，在2011年成为国际标准。所有浏览器都已支持。它最大的特点就是，服务器可以主动向客户端推送消息，客户端也可以主动向服务端发送消息，是真正的双向平等对话，属于服务器推送技术的一种。



其特点如下：

- 建立在TCP协议之上，服务器端的实现比较容易；
- 与HTTP协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用HTTP协议，因此握手时不容易屏蔽，能通过各种HTTP代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据
- 没有同源限制，苦短可以与任意服务器通信
- 协议标识符是ws（如果加密，则为wss），服务器网址就是url ```ws://example.com:80/some/path```

#### 3.3 客户端API

简单示例

```js
var ws = new WebSocket("wss://echo.websocket.org"); //新建WebSocket示例

//readyState属性返回实例对象的当前状态，共有四种。
//CONNECTING：值为0，表示正在连接。
//OPEN：值为1，表示连接成功，可以通信了。
//CLOSING：值为2，表示连接正在关闭。
//CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
//onopen 用于指定连接成功后的回调函数
ws.onopen = function(event){
  console.log("Connection open...");
  ws.send("Hello WebSocket!");
}
//若要指定多个回调函数，可以使用addEventListener
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});

//onmessage 用于指定收到服务器数据后的回调函数,服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）
ws.onmessage = function(event){
  console.log("Received Message:"+event.data);
  if(typeof event.data === String) {
    console.log("Received data string");
  }
  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
//除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};
// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};

//onmessage 用于指定连接关闭后的回调函数,
ws.onclose = function(event){
  console.log("Connection closed.");
}

//onerror 用于指定报错时的回调函数
socket.onerror = function(event) {
  // handle error event
};

ws.send() //用于向服务器发送数据
//发送文本
ws.send('your message');
//发送Blob对象
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
//发送ArrayBuffer对象
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);

//bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

#### 3.4 服务端的实现

常用的Node实现方式有三种：

- [µWebSockets](https://github.com/uWebSockets/uWebSockets)
- [Socket.IO](http://socket.io/)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

```
```

#### 3.5 WebSocketed服务器

它的最大特点，就是后台脚本不限语言，标准输入（stdin）就是 WebSocket 的输入，标准输出（stdout）就是 WebSocket 的输出。



# 二、浏览器原理

### 2.1 浏览器结构



内核判别

```js
//navigator.userAgent
'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
 Windows NT 4.0 = NT 4.0
 Windows 2000 = NT 5.0
 Windows XP = NT 5.1
 Windows Vista = NT 6.0
 Windows 7 = NT 6.1
 Windows 8 = NT 6.2
 Windows 8.1 = NT 6.3
 Windows 10 = NT 10.0
```

### 2.2 渲染机制



### 2.3 数据存储



### 2.4 缓存机制

##### **为何要运用缓存？**

缓存的优点：

- 减少了不必要的数据传输，节省带宽
- 减少服务器的负担，提升网站性能
- 加快了客户端加载网页的速度
- 用户体验友好

缺点：

- 资源如果有更改但是客户端不及时更新会造成用户获取信息滞后，如果老版本有bug的话，情况会更加糟糕。

**所以，为了避免设置缓存错误，掌握缓存的原理对于我们工作中去更加合理的配置缓存是非常重要的。**

##### 2.4.1 页面定义

```html
<meta http-equiv="Pragma" content="no-cache"/>
<!--告诉浏览器当前页面不被缓存，每次访问都去服务器拉取-->
<!--并非所有浏览器都支持，所有缓存代理服务器都不支持，因为代理并不解析HTML内容本身-->
```

##### 2.4.2 HTTP协议定义

（1）Expires策略

​	响应头字段，告诉浏览器在那个时间点（过期时间）之前浏览器可以直接从浏览器缓存取数据，而无需再次请求。*是HTTP1.0的东西，现在浏览器默认使用1.1，所以它的作用基本忽略。*

（2）Cache-Control策略

​	控制浏览器是否直接从浏览器缓存取数据还是重新发送请求到服务器取数据。优先级高于Expires。

```js
public   //所有内容都将被缓存（客户端和代理服务器都可缓存）
private  //内容只缓存到私有缓存中（仅客户端可以缓存，代理服务器不可缓存）
max-age  //指示科幻段可以接收生存期不大于指定时间（s）的响应,这个选项只在 HTTP1.1 可用，并如果和 Last-Modified 一起使用时，优先级较高。
min-fresh//指示客户端可以接收响应时间小于当前时间+指定时间的响应
max-stale//指示客户端可以接收超时期间的响应消息，如果指定此值，那么客户端可以接收超出超时期指定值之内的响应消息
no-cache //可以在客户端存储资源，每次都必须会往返服务端对比 ETag做新鲜度校验，来决定从服务端获取新的资源（200）还是使用客户端缓存（304）。也就是所谓的协商缓存。
no-store //彻底禁用缓冲，所有内容都不会被缓存到浏览器缓存或临时文件中，每次都去服务器请求
```

```
cache-control:max-age=31536000,public,immutable
```

max-age表示缓存的时间是31536000秒（1年），public表示可以被浏览器和代理服务器缓存，代理服务器一般可用nginx来做。immutable表示该资源永远不变，但是实际上该资源并不是永远不变，它这么设置的意思是为了让用户在刷新页面的时候不要去请求服务器！啥意思？就是说，如果你只设置了cahe-control:max-age=31536000,public  这属于强缓存，每次用户正常打开这个页面，浏览器会判断缓存是否过期，没有过期就从缓存中读取数据；但是有一些 "聪明" 的用户会点击浏览器左上角的刷新按钮去刷新页面，这时候就算资源没有过期（1年没这么快过），浏览器也会直接去请求服务器，这就是额外的请求消耗了，这时候就相当于是走协商缓存的流程了（下面会讲到）。如果cahe-control:max-age=315360000,public再加个immutable的话，就算用户刷新页面，浏览器也不会发起请求去服务，浏览器会直接从本地磁盘或者内存中读取缓存并返回200状态，看上图的红色框（from memory cache）。这是2015年facebook团队向制定 HTTP 标准的 IETF 工作组提到的建议：他们希望 HTTP 协议能给 Cache-Control 响应头增加一个属性字段表明该资源永不过期，浏览器就没必要再为这些资源发送条件请求了。

（3）Last-Modified|If-Modified-Since

​	配合Cache-Control使用。

- Last-Modified 标识这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间；
- If-Modified-Since 当资源过期（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，则再次向web服务器请求时带上头If-Modified-Since，表示请求时间。   web服务器收到请求后发现有If-Modified-Since，则与被请求资源的最后修改时间进行比对，若最后修改时间较新，说明资源又被改动过，则响应整个资源内容（写在响应体内），HTTP为200；若最后修改时间较旧，说明资源无新修改，则响应304，告诉浏览器继续使用所保存的cache数据

（4）Etag|If-None-Match

​	也要配合Cache-Control使用。

- Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）。Apache中Etag的值默认是对文件的索引节（INode），大小和最后修改时间（MTime）进行Hash后得到
- If-None-Match：当资源过期时，发现资源具有Etag声明，则再次向web服务器请求时带上头If-None-Match。   web服务器收到请求后发现有头If-None-Match则与被请求资源的相应校验串进行比对时，决定返回200或304.

```js
//既生Last-Modified何生Etag？
```

​		你可能会觉得使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：

- Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间

- 如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
- 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

```
Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。
```

**用户行为与缓存**

| 用户操作      | Expires\|Cache-Control | Last-Modified\|Etag |
| ------------- | :--------------------: | :-----------------: |
| 地址栏回车    |       √（有效）        |      √（有效）      |
| 页面链接跳转  |           √            |      √（有效）      |
| 新开窗口      |           √            |      √（有效）      |
| 前进\|后退    |           √            |      √（有效）      |
| F5刷新        |           ×            |      √（有效）      |
| Ctrl + F5刷新 |           ×            |          ×          |

![浏览器第一次请求](\image-http\浏览器第一次请求.png)

浏览器再次请求：

![缓存请求机制](\image-http\缓存请求机制.png)

强缓存与协商缓存

https://www.jianshu.com/p/9c95db596df5

##### 2.4.3 强缓存总结

1. cache-control: max-age=xxxx，public
    客户端和代理服务器都可以缓存该资源；
    客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，如果用户做了刷新操作，就向服务器发起http请求
2. cache-control: max-age=xxxx，private
    只让客户端可以缓存该资源；代理服务器不缓存
    客户端在xxx秒内直接读取缓存,statu code:200
3. cache-control: max-age=xxxx，immutable
    客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，即使用户做了刷新操作，也不向服务器发起http请求
4. cache-control: no-cache
    跳过设置强缓存，但是不妨碍设置协商缓存；一般如果你做了强缓存，只有在强缓存失效了才走协商缓存的，设置了no-cache就不会走强缓存了，每次请求都回询问服务端。
5. cache-control: no-store
    不缓存，这个会让客户端、服务器都不缓存，也就没有所谓的强缓存、协商缓存了。

##### 2.4.4 协商缓存

上面说到的强缓存就是给资源设置个过期时间，客户端每次请求资源时都会看是否过期；只有在过期才会去询问服务器。所以，强缓存就是为了给客户端自给自足用的。而当某天，客户端请求该资源时发现其过期了，这是就会去请求服务器了，而这时候去请求服务器的这过程就可以设置协商缓存。这时候，协商缓存就是需要客户端和服务器两端进行交互的。

也就是说，每次请求返回来 response header 中的 etag和 last-modified，在下次请求时在 request header 就把这两个带上，服务端把你带过来的标识进行对比，然后判断资源是否更改了，如果更改就直接返回新的资源，和更新对应的response header的标识etag、last-modified。如果资源没有变，那就不变etag、last-modified，这时候对客户端来说，每次请求都是要进行协商缓存了，即：

发请求-->看资源是否过期-->过期-->请求服务器-->服务器对比资源是否真的过期-->没过期-->返回304状态码-->客户端用缓存的老资源。

这就是一条完整的协商缓存的过程。

当然，当服务端发现资源真的过期的时候，会走如下流程：

发请求-->看资源是否过期-->过期-->请求服务器-->服务器对比资源是否真的过期-->过期-->返回200状态码-->客户端如第一次接收该资源一样，记下它的cache-control中的max-age、etag、last-modified等。

所以协商缓存步骤总结：

请求资源时，把用户本地该资源的 etag 同时带到服务端，服务端和最新资源做对比。
 如果资源没更改，返回304，浏览器读取本地缓存。
 如果资源有更改，返回200，返回最新的资源。

```csharp
// response header
etag: '5c20abbd-e2e8'
last-modified: Mon, 24 Dec 2018 09:49:49 GMT

// request header 变为
if-none-matched: '5c20abbd-e2e8'
if-modified-since: Mon, 24 Dec 2018 09:49:49 GMT
```



# 三、模块化规范

使用：https://www.jianshu.com/p/36ec85a2b394

### 3.1 CMD

### 3.2 AMD

### 3.3 ES Module

https://segmentfault.com/a/1190000020388889

# 四、服务端Node.js

