# 一、网络通信原理

网络七层模型（OSI）

实际应用中是网络四层模型：

![网络模型-四层](image-http\网络模型-四层.png)

HTTP是B/S架构模式，即客户端发起请求，服务器送回响应。一次HTTP请求可包含如下步骤：

- 浏览器端发起请求；

- DNS域名解析；

- 数据经过通信子网，需要客户端与服务器需要建立TCP连接（三次握手）；建立连接后，客户端发送一个请求给服务器，请求头格式为：统一资源标示符（URL）、协议版本号，后边是MIME信息（如请求修饰符、客户端信息等）

- 服务器接到请求后，给予相应的响应信息，其格式为：状态行（包括协议版本号、成功或错误的状态码，后边是MIME信息（包括服务器信息、实体信息等））

- 客户端接收服务器返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接（四次挥手）

  如果在以上过程中的某一边出现错误，那么产生的错误信息将返回到客户端，由显示屏输出。对于用户来说，这些过程是HTTP自己完成的，用户只要点击连接，等待信息显示就可以了。

- 浏览器解析渲染。

## TCP三次握手与四次挥手

![TCP连接报文格式](\image-http/TCP连接报文格式.png)

- **序列号seq**：占4B，用来标记数据段的序号，TCP把连接中发送的所有字节都编号，第一个字节的编号由本地随机产生；给字节编号之后，在发送报文时每个报文会指派一个序列号seq就是报文段中第一个字节的数据编号。

- **确认号ack**：占4B，期待收到对方下一个报文段的第一个数据字节的编号；

**序列号表示报文段携带数据的第一个字节的编号；而确认号指的是期望接收的下一个字节的编号；因此当前报文段最后一个字节的编号+1即为确认号。**

**握手信号**

| 字段 | 含义                                                         |
| ---- | ------------------------------------------------------------ |
| URG  | 紧急指针是否有效。为1表示某一位需要优先被处理                |
| ACK  | 确认号是否有效，为1时确认号有效，为0确认号无效               |
| PSH  | 提示接收端应用程序立即从TCP缓冲区把数据读走                  |
| RST  | 对方要求重新建立连接，复位                                   |
| SYN  | 同步序列号。当SYN=1,ACK=0时表示这是一个连接请求报文段。若同意连接，则在响应中置SYN=1,ACK=1；因此，SYN=1表示这是一个连接请求或连接接受报文。只有在TCP建立连接时才会被置1，握手完成后SYN标志位被置0 |
| FIN  | 用来释放连接，为1表示此报文段的发送方的数据已发送完毕，并要求释放运输连接。 |

![TCP三次握手](\image-http/TCP三次握手.png)

过程描述：

1. 建立连接时，客户端发送SYN包到服务端，并进入**SYN_SENT**状态，等待服务器确认；
2. 服务器收到SYN包，必须确认客户端的SYN(ack=seq+1)，然后发送syn+ack包，此时服务器进入**SYN_RECV**状态；
3. 客户端收到SYN+ACK包，向服务器发送确认包ACK，此包发送完毕，客户端和服务器端进入**ESTABLISHED**（TCP连接成功）状态，完成三次握手。

![TCP四次挥手](\image-http/TCP四次挥手.png)

过程描述：

1）客户端进程发出连接释放报文，并且停止发送数据。释放数据报文首部，FIN=1，其序列号为seq=u（等于前面已经传送过来的数据的最后一个字节的序号加1），此时，客户端进入**FIN-WAIT-1**（终止等待1）状态。 TCP规定，FIN报文段即使不携带数据，也要消耗一个序号。
2）服务器收到连接释放报文，发出确认报文，ACK=1，ack=u+1，并且带上自己的序列号seq=v，此时，服务端就进入了**CLOSE-WAIT**（关闭等待）状态。TCP服务器通知高层的应用进程，客户端向服务器的方向就释放了，这时候处于半关闭状态，即客户端已经没有数据要发送了，但是服务器若发送数据，客户端依然要接受。这个状态还要持续一段时间，也就是整个CLOSE-WAIT状态持续的时间。
3）客户端收到服务器的确认请求后，此时，客户端就进入**FIN-WAIT-2**（终止等待2）状态，等待服务器发送连接释放报文（在这之前还需要接受服务器发送的最后的数据）。
4）服务器将最后的数据发送完毕后，就向客户端发送连接释放报文，FIN=1，ack=u+1，由于在半关闭状态，服务器很可能又发送了一些数据，假定此时的序列号为seq=w，此时，服务器就进入了**LAST-ACK**（最后确认）状态，等待客户端的确认。
5）客户端收到服务器的连接释放报文后，必须发出确认，ACK=1，ack=w+1，而自己的序列号是seq=u+1，此时，客户端就进入了**TIME-WAIT**（时间等待）状态。注意此时TCP连接还没有释放，必须经过2∗∗MSL（最长报文段寿命的时间）后，当客户端撤销相应的TCB后，才进入CLOSED状态。
6）服务器只要收到了客户端发出的确认，立即进入**CLOSED**状态。同样，撤销TCB后，就结束了这次的TCP连接。可以看到，服务器结束TCP连接的时间要比客户端早一些。

#### 常见问题

1. 为甚连接的时候是三次，而关闭的时候时四次？

   ​	关闭连接时，当Server端收到FIN报文时，很可能并不会立即关闭SOCKET，所以只能先回复一个ACK报文，告诉Client端，"你发的FIN报文我收到了"。只有等到我Server端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。

2. 为什么TIME_WAIT状态需要经过2MSL(最大报文段生存时间)才能返回到CLOSE状态？

   ​	虽然按道理，四个报文都发送完毕，我们可以直接进入CLOSE状态了，但是网络是不可靠的，有可以最后一个ACK丢失。所以TIME_WAIT状态就是用来重发可能丢失的ACK报文。在Client发送出最后的ACK回复，但该ACK可能丢失。Server如果没有收到ACK，将不断重复发送FIN片段。所以Client不能立即关闭，它必须确认Server接收到了该ACK。Client会在发送出ACK之后进入到TIME_WAIT状态。Client会设置一个计时器，等待2MSL的时间。如果在该时间内再次收到FIN，那么Client会重发ACK并再次等待2MSL。

   ​	所谓的2MSL是两倍的MSL(Maximum Segment Lifetime)。MSL指一个片段在网络中最大的存活时间，2MSL就是一个发送和一个回复所需的最大时间。如果直到2MSL，Client都没有再次收到FIN，那么Client推断ACK已经被成功接收，则结束TCP连接。

3. 为什么不能用两次握手进行连接？

   ​	现在把三次握手改成仅需要两次握手，死锁是可能发生的。作为例子，考虑计算机S和C之间的通信，假定C给S发送一个连接请求分组，S收到了这个分组，并发 送了确认应答分组。按照两次握手的协定，S认为连接已经成功地建立了，可以开始发送数据分组。可是，在S的应答分组在传输中被丢失的情况下，C将不知道S 是否已准备好，不知道S建立什么样的序列号，C甚至怀疑S是否收到自己的连接请求分组。在这种情况下，C认为连接还未建立成功，将忽略S发来的任何数据分 组，只等待连接确认应答分组。而S在发出的分组超时后，重复发送同样的分组。这样就形成了死锁。

4. 如果已经建立了连接，但是客户端突然出现故障了怎么办？

   ​	TCP还设有一个保活计时器，显然，客户端如果出现故障，服务器不能一直等下去，白白浪费资源。服务器每收到一次客户端的请求后都会重新复位这个计时器，时间通常是设置为2小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔75秒钟发送一次。若一连发送10个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。

## HTTP的诞生及发展历程

​		20世纪60年代，美国国防部高等研究计划署建立了ARPA网。

​		70年代，研究人员基于对ARPA网的实践和思考，发明出了著名的TCP/IP协议。

​		1898年，蒂姆博纳斯·李博士发表论文，提出了在互联网上构建链接文档系统的构想，在文章中确立了三项关键技术：URI、HTML、HTTP。

​		1991年，HTTP（Hyper Text Transfer Protocol，超文本传输协议）正式诞生，其作用是传输超文本内容HTML。**当时的版本是0.9**

​		HTTP规定了客户端发起请求、服务端响应请求的通信模式。请求报文内容只有1行：

```js
GET+请求的文件路径
```

服务端收到请求后返回一个以ASCII字符流编码的HTML文档。虽然简单，但是它充分验证了web服务的可行性。

#### HTTP/1.0

随着互联网的发展以及浏览器的出现，单纯的文本内容已经无法满足用户需求了，浏览器希望通过 HTTP 来传输脚本、样式、图片、音频和视频等不同类型的文件，所以在 1996 年 HTTP 更新的 1.0 版本中引入了如下特性：

- 增加了 HEAD、POST 等新方法
- 增加了响应状态码，标记可能的错误原因
- 引入了协议版本号概念
- 引入了 HTTP Header（头部）的概念，让 HTTP 处理请求和响应更加灵活
- 传输的数据不再局限于文本

其中最核心的改变是增加了头部设定，头部内容以键值对的形式设置。请求头部通过 Accept 字段来告诉服务端可以接收的文件类型，响应头部再通过 Content-Type 字段来告诉浏览器返回文件的类型。**头部字段不仅用于解决不同类型文件传输的问题，也可以实现其他很多功能如缓存、认证信息等。**

**但是 HTTP/1.0 并不是一个“标准”，只是一份参考文档，不具有实际的约束力。**

#### HTTP/1.1

随着互联网的迅速发展，HTTP/1.0 也已经无法满足需求，最核心的就是连接问题。在 HTTP 1.1 中，发起一个请求是这样的：

```
浏览器请求 url -> 解析域名 -> 建立 HTTP 连接 -> 服务器处理文件 -> 返回数据 -> 浏览器解析、渲染文件
```

具体来说就是 HTTP/1.0 每进行一次通信，都需要经历**建立连接**、**传输数据**和**断开连接**三个阶段。当一个页面引用了较多的外部文件时，这个建立连接和断开连接的过程就会增加大量网络开销。

为了解决 HTTP/1.0 的问题，1999 年推出的 HTTP/1.1 有以下特点：

- 长连接Keep-Alive：引入了 TCP 连接复用，即一个 TCP 默认不关闭，可以被多个请求复用
- 并发连接：对一个域名的请求允许分配多个长连接（缓解了长连接中的「队头阻塞」问题）
- 引入管道机制，一个 TCP 连接，可以同时发送多个请求。（响应的顺序必须和请求的顺序一致，因此不常用）
- 增加了 PUT、DELETE、OPTIONS、PATCH 等新的方法
- 新增了一些缓存的字段（If-Modified-Since, If-None-Match）
- 请求头中引入了 range 字段，支持断点续传
- 允许响应数据分块（chunked），利于传输大文件
- 强制要求 Host 头，让互联网主机托管称为可能

**HTTP/1.1 是一个“正式的标准”。**

#### HTTP/2.0

HTTP/1.1 通过长连接减少了大量创建/断开连接造成的性能消耗，但是它的并发能力受到限制，表现在两个方面：

- ##### 队头阻塞问题

  HTTP/1.1 中使用持久连接时，一个连接中同一时刻只能处理一个请求，所以请求是以串行队列方式处理的。当前的请求没有结束之前，其他的请求只能处于阻塞状态，这种情况被称为「队头阻塞」。所以实际上我们只是节省了建立连接的时间，而获取数据的时间并没有减少。

- **最大并发数问题**

  限制了同一个域名下的 HTTP 连接数，即 6 ~ 8 个。假设，我们在 Apache 中设置了最大并发数 300，而因为浏览器本身的限制，最大请求数为 6，那么服务器能承载的最高并发数是 50。

2015 年正式发布的 HTTP/2 默认不再使用 ASCII 编码传输，而是改为二进制数据，来提升传输效率。

​		客户端在发送请求时会将每个请求的内容封装成不同的带有编号的二进制帧（Frame），然后将这些帧同时发送给服务端。服务端接收到数据之后，会将相同编号的帧合并为完整的请求信息。同样，服务端返回结果、客户端接收结果也遵循这个帧的拆分与组合的过程。

​		有了二进制分帧后，对于同一个域，客户端只需要与服务端建立一个连接即可完成通信需求，这种利用一个连接来发送多个请求的方式称为**「多路复用」**。每一条路都被称为一个 stream（流）。

HTTP/2.0 的主要改动包括：

- 数据通过二进制协议传输，不再是纯文本
- 多路复用，废弃了 1.1 中的管道
- 使用专用算法压缩头部，减少数据传输量
- 通过设置数据帧的优先级，让服务器优先处理某些请求
- 允许服务器主动向客户推送数据
- 头部字段全部改为小写；引入了伪头部的概念，出现在头部字段之前，以冒号开头
- 增强了安全性，“事实上”要求加密通信

HTTP/2.0 虽然已经发布了 6 年，不过由于 HTTP/1.1 实在太过经典和强势，目前 HTTP/2.0 的普及率还比较低，仍然有很多网站使用的是 HTTP/1.1 版本。

```js
//为何1.1不能实现多路复用，而2.0可以实现？
HTTP/2是基于二进制“帧”的协议，HTTP/1.1是基于“文本分割”解析的协议。
（1）一次只能处理一个请求或响应，因为这种以分隔符分割消息的数据，在完成之前不能停止解析。
（2）解析这种数据无法预知需要多少内存，这会带给“服务端”很大的压力，因为它不知道要把一行要解析的内容读到多大的“缓冲区”中，在保证解析效率和速度的前提下：内存该如何分配？
```

#### HTTP/3.0

​		当然 HTTP/2 也并非完美，如果客户端或服务端在通信时出现数据包丢失，或者任何一方的网络出现中断，那么整个 TCP 连接就会暂停。

​		HTTP/2 由于采用二进制分帧进行多路复用，通常只使用一个 TCP 连接进行传输，在丢包或网络中断的情况下后面的所有数据都被阻塞。

​		但对于 HTTP/1.1 来说，可以开启多个 TCP 连接，任何一个 TCP 出现问题都不会影响其他 TCP 连接，剩余的 TCP 连接还可以正常传输数据。这种情况下 HTTP/2 的表现就不如 HTTP/1 了。

​		2018 年 HTTP/3 将底层依赖的 TCP 改成 UDP，从而彻底解决了这个问题。UDP 相对于 TCP 而言最大的特点是传输数据时不需要建立连接，可以同时发送多个数据包，所以传输效率很高，缺点就是没有确认机制来保证对方一定能收到数据。

#### 总结

| 协议版本 | 解决的核心问题           | 解决方式                               |
| -------- | ------------------------ | -------------------------------------- |
| 0.9      | HTML 文件传输            | 确立了客户端请求、服务端响应的通信流程 |
| 1.0      | 不同类型文件传输         | 设立头部字段                           |
| 1.1      | 创建/断开 TCP 连接开销大 | 建立长连接进行复用                     |
| 2        | 并发数有限               | 二进制分帧                             |
| 3        | TCP 丢包阻塞             | 采用 UDP 协议                          |

## 1. HTTP协议

​		HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）

**HTTP 工作原理**

​		HTTP协议浏览器作为HTTP客户端通过URL向HTTP服务端即**WEB服务器**发送所有请求。

​		Web服务器有：Apache服务器，IIS服务器（Internet Information Services）等。

​		Web服务器根据接收到的请求后，向客户端发送响应信息。

​		HTTP默认端口号为80，但是你也可以改为8080或者其他端口。

**HTTP三点注意事项：**

（1）HTTP是无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。

（2）HTTP是媒体独立的：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型。

（3）HTTP是无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

![img](\image-http\http工作原理.png)

​		CGI(Common Gateway Interface) 是 HTTP 服务器与你的或其它机器上的程序进行“交谈”的一种工具，其程序须运行在网络服务器上。绝大多数的 CGI 程序被用来解释处理来自表单的输入信息，并在服务器产生相应的处理，或将相应的信息反馈给浏览器。CGI 程序使网页具有交互功能。

​		浏览器显示的内容都有 HTML、XML、GIF、Flash 等，浏览器是通过 MIME Type 区分它们，决定用什么内容什么形式来显示。

**注释**：*MIME Type 是该资源的媒体类型，MIME Type 不是个人指定的，是经过互联网（IETF）组织协商，以 RFC（是一系列以编号排定的文件，几乎所有的互联网标准都有收录在其中） 的形式作为建议的标准发布在网上的，大多数的 Web 服务器和用户代理都会支持这个规范 (顺便说一句，Email 附件的类型也是通过 MIME Type 指定的)。*

**媒体类型通常通过 HTTP 协议，由 Web 服务器告知浏览器的，更准确地说，是通过 Content-Type 来表示的。例如：Content-Type：text/HTML。**通常只有一些在互联网上获得广泛应用的格式才会获得一个 MIME Type，如果是某个客户端自己定义的格式，一般只能以 application/x- 开头。

```js
//Content-Type 标头告诉客户端实际返回的内容的内容类型。
//常见的媒体格式类型如下：
text/html ： HTML格式
text/plain ：纯文本格式
text/xml ： XML格式
image/gif ：gif图片格式
image/jpeg ：jpg图片格式
image/png：png图片格式
//以application开头的媒体格式类型：
application/xhtml+xml ：XHTML格式
application/xml				：XML数据格式
application/atom+xml 	：Atom XML聚合格式
application/json			：JSON数据格式
application/pdf				：pdf格式
application/msword 		：Word文档格式
application/octet-stream ：二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ：<form encType=””>中默认值，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
//另外一种常见的媒体格式是上传文件之时使用的：
multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
```

### 1.0 首部

**HTTP 消息头**允许客户端和服务器通过 **request**和 **response**传递附加信息。一个请求头由名称（不区分大小写）后跟一个冒号“：”，冒号后跟具体的值（不带换行符）组成。该值前面的引导空白会被忽略。

自定专用消息头可通过'X-' 前缀来添加；但是这种用法被IETF在2012年6月发布的 [RFC6648](https://tools.ietf.org/html/rfc6648) 中明确弃用，原因是其会在非标准字段成为标准时造成不便；其他的消息头在 [IANA 注册表](https://www.iana.org/assignments/message-headers/perm-headers.html) 中列出, 其原始内容在 [RFC 4229](https://tools.ietf.org/html/rfc4229) 中定义。 此外，IANA 还维护着[被提议的新HTTP 消息头注册表](https://www.iana.org/assignments/message-headers/prov-headers.html).

根据不同上下文，可将消息头分为：

- [General headers](https://developer.mozilla.org/zh-CN/docs/Glossary/General_header): 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
- [Request headers](https://developer.mozilla.org/zh-CN/docs/Glossary/Request_header): 包含更多有关要获取的资源或客户端本身信息的消息头。
- [Response headers](https://developer.mozilla.org/zh-CN/docs/Glossary/Response_header): 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
- [Entity headers](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity_header): 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。

消息头也可以根据代理对其的处理方式分为：

**端到端消息头**

这类消息头必须被传输到最终的消息接收者，也即，请求的服务器或响应的客户端。中间的代理服务器必须转发未经修改的端到端消息头，并且必须缓存它们。

**逐跳消息头**

这类消息头仅对单次传输连接有意义，不能通过代理或缓存进行重新转发。这些消息头包括 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection), [`Keep-Alive`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive), [`Proxy-Authenticate`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Proxy-Authenticate), [`Proxy-Authorization`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Proxy-Authorization), [`TE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/TE), [`Trailer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Trailer), [`Transfer-Encoding`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding) 及 [Upgrade (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade)。注意，只能使用 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection) 来设置逐跳一般头。

##### 通用首部

最常见的通用首部包括：[`Date`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Date)、[`Cache-Control`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control) 或 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection)。



### 1.1 请求

##### 请求报文

![http-request-header](\image-http\http-request-header.webp)

###### (1) 状态行

- method		请求方法

```js
常见的值有:
GET 		请求指定的页面信息，并返回消息响应主体
HEAD 		类似于GET，只不过返回的响应中没有具体的内容，用于获取报头
POST 		向指定资源提交数据进行处理请求（提交表单或上传文件）。数据包含在请求体中，post可能会导致新的资源的建立和已有资源的修改
DELETE 	请求服务器删除指定页面
PUT 	 	从客户端向服务器传送的数据取代指定的文档内容
TRACE 	回显服务器收到的请求，主要用于测试或诊断
FETCH 	
OPTIONS 预检请求，允许客户端查看服务器的性能
```

- url 			从web服务器根开始的绝对路径，与报文头的host拼接在一起是完整的请求url
- http/1.1	协议名称和版本号

**PUT请求和GET请求的区别**

![image-20211105203507543](\image-http/http-put和post的区别.png)

###### (2) 报文头

有若干个属性，形式为key-value，服务端据此获取客户端信息。**每行用一个“回车换行”分隔，末尾再追加一个“回车换行”作为整个请求的结束。**

```js
User-Agent			客户端信息，建议加上，它是服务器统计、追踪以及识别客户端的依据。
Content-Length	它标明了服务器返回数据的长度，这个长度是不包含HTTP头长度的
//换句话说，我们的请求中并没有Range字段（后面会说到），表示我们请求的是整个文件，所以Content-Length就是整个文件的大小。
```

​		这段返回数据同样是以最后一行的结束标志（回车换行）和一个额外的回车换行作为结束，即“/r/n/r/n”。而“/r/n/r/n”后面紧接的就是文件的内容了，这样我们就可以找到“/r/n/r/n”，并从它后面的第一个字节开始，源源不断的读取，再写到文件中了。

以上就是通过HTTP协议实现文件下载的全过程。但还不能实现断点续传，而实际上断点续传的实现非常简单，只要在请求中加一个Range字段就可以了。

假如一个文件有1000个字节，那么其范围就是0-999，则：

```js
Range: bytes=500-   	表示读取该文件的500-999字节，共500字节。
Range: bytes=500-599  表示读取该文件的500-599字节，共100字节。
//Range还有其它几种写法，但上面这两种是最常用的，对于断点续传也足矣了。如果HTTP请求中包含Range字段，那么服务器会返回206（Partial Content），同时HTTP头中也会有一个相应的Content-Range字段，类似下面的格式：
Content-Range: bytes 500-999/1000
//Content-Range字段说明服务器返回了文件的某个范围及文件的总长度。这时Content-Length字段就不是整个文件的大小了，而是对应文件这个范围的字节数，这一点一定要注意。
```

- 如果我们请求的文件的URL是类似http://www.server.com/filename.exe这样的文件下载，则不会有问题。
- 但是很多软件下载网站的文件下载链接都是通过程序重定向的，比如pchome的ACDSee的HTTP下载地址是：http://download.pchome.net/php/tdownload2.php?sid=5547&url=/multimedia/viewer/acdc31sr1b051007.exe&svr=1&typ=0 这种地址并没有直接标识文件的位置，而是通过程序进行了重定向。如果向服务器请求这样的URL，服务器就会返回302（Moved Temporarily），意思就是需要重定向，同时在HTTP头中会包含一个Location字段，Location字段的值就是重定向后的目的 URL。这时就需要断开当前的连接，而向这个重定向后的服务器发请求。

###### (3) 报文体

​		将页面表单中组件值通过param1=value&param2=val2的键值对形式编码成一个格式化串，他承载多个请求参数的数据，不但报文头可以传递请求参数，URL也可以通过“/chapter15/user.html? param1=value1&param2=value2”的方式传递数值



##### **请求实例**

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

**浏览器中的示例**

![image-20211105204231191](\image-http/http请求示例.png)

### 1.2 响应

##### 响应报文

![http-response-header](\image-http\http-response-header.webp)

```js
//响应报文与请求报文一样，由三个部分组成（响应行，响应头和响应体）
（1）报文协议及版本
（2）状态码及状态描述
（3）响应报文头，由多个属性组成
（4）响应报文体，即客户端要的数据

```

![http请求头和相应头](\image-http\http请求头和相应头.png)



##### 响应状态码

| 状态码  | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| 100~199 | 表示成功接受请求，要求客户端继续提交下一次请求才能完成整改处理过程 |
| 200~299 | 表示成功接收请求并已完成整个处理过程                         |
| 300~399 | 未完成请求，客户需要进一步虚化请求                           |
| 400~499 | 客户端的请求有错误                                           |
| 500~599 | 服务器端出现错误                                             |

```js
//常见xmlhttp.status的值及解释：
100——客户必须继续发出请求 
101——客户要求服务器根据请求转换HTTP协议版本 

200——交易成功 
201——提示知道新文件的URL 
202——接受和处理、但处理未完成 
203——返回信息不确定或不完整 
204——请求收到，但返回信息为空 
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件 
206——服务器已经完成了部分用户的GET请求 

300——请求的资源可在多处得到 
301——删除请求数据 
302——在其他地址发现了请求数据 
303——建议客户访问其他URL或访问方式 
304——客户端已经执行了GET，但文件未变化 
305——请求的资源必须从服务器指定的地址得到 
306——前一版本HTTP中使用的代码，现行版本中不再使用 
307——申明请求的资源临时性删除 

400——错误请求，如语法错误 
401——请求授权失败 
402——保留有效ChargeTo头响应 
403——请求不允许 
404——没有发现文件、查询或URl 
405——用户在Request-Line字段定义的方法不允许 
406——根据用户发送的Accept拖，请求资源不可访问 
407——类似401，用户必须首先在代理服务器上得到授权 
408——客户端没有在用户指定的饿时间内完成请求 
409——对当前资源状态，请求不能完成 
410——服务器上不再有此资源且无进一步的参考地址 
411——服务器拒绝用户定义的Content-Length属性请求 
412——一个或多个请求头字段在当前请求中错误 
413——请求的资源大于服务器允许的大小 
414——请求的资源URL长于服务器允许的长度 
415——请求资源不支持请求项目格式 
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段 
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求 
 
500——服务器产生内部错误 
501——服务器不支持请求的函数 
502——服务器暂时不可用，有时是为了防止发生系统过载 
503——服务器过载或暂停维修 
504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长 
505——服务器不支持或拒绝支请求头中指定的HTTP版本 
```



### 1.3 XMLHttpRequest对象

​		XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。

​		XMLHttpRequest一开始只是微软浏览器提供的一个接口，后来各大浏览器纷纷效仿也提供了这个接口，再后来W3C对它进行了标准化，提出了XMLHttpRequest标准。XMLHttpRequest标准又分为Level 1和Level 2。

##### **Level1和Level2对比**

**XMLHttpRequest Level 1主要存在以下缺点：**

- 受同源策略的限制，不能发送跨域请求；

- 不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；

- 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；

**那么Level 2对Level 1 进行了改进，XMLHttpRequest Level 2新增了以下功能：**

- 可以发送跨域请求，在服务端允许的情况下；

- 支持发送和接收二进制数据；

- 新增formData对象，支持发送表单数据；

- 发送和获取数据时，可以获取进度信息；

- 可以设置请求的超时时间；

##### 常见属性&方法

```js
**标准属性**
//只读
onreadystatechange = callback 只要 readyState 属性变化，就调用相应处理函数
//0：请求未初始化（还没有调用 open()）。
//1：请求已经建立，但是还没有发送（还没有调用 send()）。
//2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
//3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
//4：响应已完成；您可以获取并使用服务器的响应了。

response
responseText
responseXML
responseUrl
status
statusText
upload代表上传进度
//可写
responseType	//"" arraybuffer blob document json Text ms-stream **level 2才提供**
timeout 			//当为0时为不设置超时
withCredentials //布尔值 (en-US)，用来指定跨域 Access-Control 请求是否应当带有授权信息，如 cookie 或授权 header 头。

**标准方法**
open(method,url,async)
send(null||data)
abort()
getResponseHeader(key)
getAllResponseHeaders()
setResponseHeader(DOMString header, DOMString value)

**事件**
loadStart
load
loadend
progress
abort
error
timeout
```

在发送Ajax请求（实质是一个HTTP请求）时，我们可能需要设置一些请求头部信息，比如content-type、connection、cookie、accept-xxx等。xhr提供了setRequestHeader来允许我们修改请求 header。

- 方法的第一个参数 header 大小写不敏感，即可以写成content-type，也可以写成Content-Type，甚至写成content-Type;Content-Type的默认值与具体发送的数据类型有关，请参考本文【可以发送什么类型的数据】一节；

- setRequestHeader必须在open()方法后，send()方法前调用，否则会抛错；

- setRequestHeader可以调用多次，最终的值不会采用覆盖override的方式，而是采用追加append的方式。

- overrideMimeType()( **level 1就提供**)用来重写response的content-type。比如：server 端给客户端返回了一份document或者是 xml文档，我们希望最终通过xhr.response拿到的就是一个DOM对象，那么就可以用xhr.overrideMimeType('text/xml; charset = utf-8')来实现。

##### **兼容性**

使用https://caniuse.com/?search=XMLHttpRequest查看兼容性

IE8/IE9、Opera Mini 完全不支持xhr对象

IE10/IE11部分支持，不支持 xhr.responseType为json

部分浏览器不支持设置请求超时，即无法使用xhr.timeout

部分浏览器不支持xhr.responseType为blob

### 1.3 web中间件

1. 简介
   https://blog.csdn.net/qq_33163046/article/details/113363426
   https://zhuanlan.zhihu.com/p/337954896
2. 存在的漏洞
   https://www.cnblogs.com/wjw-zm/p/11802615.html

## 2. 跨域

​		由于浏览器的同源策略（协议、主机、端口号）限制，不同域名之间不能进行信息访问。

常见的跨域方法

##### （1）document.domain

#####  （2）window.postMessage

##### （3）cors

##### （4）nginx



##### 简单请求与非简单请求

- 请求方式为：HEAD,GET,POST

- 请求头信息：

  ​			Accept

  ​			Accept-Language

  ​			Content-Language

  ​			Last-Event-ID

  ​			Content-Type对应的是以下三个中的任意一个：

  ​									application/x-www-form-urlencode

  ​									multipart/form-data

  ​									text/plain

只有同时满足以上两个条件时，才是简单请求，否则为非简单请求。



## 3. WebSocket

### 3.1 数据通信方式

数据通信分为串行通信和并行通信。

**串行通信**是一种使用双线即发送器和接收器逐位发送数据的技术。使用类似技术的通讯产品包括串口服务器、以太网模块等。串行通信根据数据流的方向又分为：单工、半双工和全双工通信。

![串行通信](\image-http/串行通信.png)

- 单工通信：数据只能在一个方向上进行传输，A只能发送数据，B只能接受数据。例如：灯塔和航船
- 半双工通信：允许数据在两个方向上传输，但是在某一时刻只允许数据在某一方向上传输，它实际上是一种切换方向的单工通信。例如：对讲机
- 全双工通信：允许数据同时在两个方向上传输，他是两个单工通信的结合，要求发送设备和接收设备都具有独立接受和发送能力。例如：电话通信

**并行通信**采用多I/O线的方式，一次发送一块数据（8|16|32位），速度快。并行传输用于CPU、RAM等。

https://www.ruanyifeng.com/blog/2017/05/websocket.html

#### 3.2 websocket简介

**HTTP协议缺陷**

```js
通信只能由客户端发起，做不到服务器主动向客户端推送消息。这种单项请求的特点，使得在服务器由连续的状态变化时，客户端要获知就非常麻烦，只能采用“轮询”方式，即每隔一段时间就发出一个询问，了解服务器有没有新的信息。
//典型场景：聊天室
轮询效率低，非常浪费资源。（因为必须不停连接，捉着HTTP连接始终打开。）
```

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

#### 3.6 **WebSocket的使用场景**

对于一些**高实时行**要求的应用，如下：

**1.社交聊天**

最著名的就是微信，QQ，这一类社交聊天的app。这一类聊天app的特点是低延迟，高即时。即时是这里面要求最高的，如果有一个紧急的事情，通过IM软件通知你，假设网络环境良好的情况下，这条message还无法立即送达到你的客户端上，紧急的事情都结束了，你才收到消息，那么这个软件肯定是失败的。

**2.弹幕**

说到这里，大家一定里面想到了A站和B站了。确实，他们的弹幕一直是一种特色。而且弹幕对于一个视频来说，很可能弹幕才是精华。发弹幕需要实时显示，也需要和聊天一样，需要即时。

**3.多玩家游戏**

**4.协同编辑**

现在很多开源项目都是分散在世界各地的开发者一起协同开发，此时就会用到版本控制系统，比如Git，SVN去合并冲突。但是如果有一份文档，支持多人实时在线协同编辑，那么此时就会用到比如WebSocket了，它可以保证各个编辑者都在编辑同一个文档，此时不需要用到Git，SVN这些版本控制，因为在协同编辑界面就会实时看到对方编辑了什么，谁在修改哪些段落和文字。

**5.股票基金实时报价**

金融界瞬息万变——几乎是每毫秒都在变化。如果采用的网络架构无法满足实时性，那么就会给客户带来巨大的损失。几毫秒钱股票开始大跌，几秒以后才刷新数据，一秒钟的时间内，很可能用户就已经损失巨大财产了。

**6.体育实况更新**

全世界的球迷，体育爱好者特别多，当然大家在关心自己喜欢的体育活动的时候，比赛实时的赛况是他们最最关心的事情。这类新闻中最好的体验就是利用Websocket达到实时的更新！

**7.视频会议/聊天**

视频会议并不能代替和真人相见，但是他能让分布在全球天涯海角的人聚在电脑前一起开会。既能节省大家聚在一起路上花费的时间，讨论聚会地点的纠结，还能随时随地，只要有网络就可以开会。

**8.基于位置的应用**

越来越多的开发者借用移动设备的GPS功能来实现他们基于位置的网络应用。如果你一直记录用户的位置(比如运行应用来记录运动轨迹)，你可以收集到更加细致化的数据。

**9.在线教育**

在线教育近几年也发展迅速。优点很多，免去了场地的限制，能让名师的资源合理的分配给全国各地想要学习知识的同学手上，Websocket是个不错的选择，可以视频聊天、即时聊天以及其与别人合作一起在网上讨论问题…

**10.智能家居**

这也是我一毕业加入的一个伟大的物联网智能家居的公司。考虑到家里的智能设备的状态必须需要实时的展现在手机app客户端上，毫无疑问选择了Websocket。

# 二、模块化规范

使用：https://www.jianshu.com/p/36ec85a2b394

### 3.1 CMD

### 3.2 AMD

### 3.3 ES Module

https://segmentfault.com/a/1190000020388889

