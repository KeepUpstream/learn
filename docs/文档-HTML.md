## 表单请求方式

### form:action请求

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Insert title here</title>
</head>
<body>
<form action="http://localhost:8080/user" method="post">

	username:<input type="text" name="username" /><br>
	
	password:<input type="password" name="password" /> <br>
	
	<input type="submit" value="登录">

</form>

</body>
</html>

```

相应的后端Controller代码

```java
package com.help.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

	@PostMapping("/user")
	@ResponseBody
	public String add(String username,String password){
		System.out.println("返回值是》》"+username+"---->"+password);
		String str = "返回值是"+username+password;
		return str;
	}
}
```



### Ajax请求

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Insert title here</title>
</head>
<body>
<!--  -->
<form  method="post" onsubmit="return false" action="##" id="formtest">

	username:<input type="text" name="username" /><br>
	
	password:<input type="password" name="password" /> <br>
	
	<input type="button" value="登录" onclick="login()">

</form>
	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="/js/extJquery.js"></script>
	<script type="text/javascript" src="/js/extEasyUI.js"></script>
<script type="text/javascript">
function login() {
    $.ajax({
    //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "text",//预期服务器返回的数据类型 如果是对象返回的是json 如果是字符串这里一定要定义text 之前我就是定义json 结果字符串的返回一直到额error中去
        /*
        dataType:
			要求为String类型的参数，预期服务器返回的数据类型。如果不指定，JQuery将自动根据http包mime信息返回responseXML或responseText，并作为回调函数参数传递。可用的类型如下：
			xml：返回XML文档，可用JQuery处理。
			html：返回纯文本HTML信息；包含的script标签会在插入DOM时执行。
			script：返回纯文本JavaScript代码。不会自动缓存结果。除非设置了cache参数。注意在远程请求时（不在同一个域下），所有post请求都将转为get请求。
			json：返回JSON数据。
			jsonp：JSONP格式。使用SONP形式调用函数时，例如myurl?callback=?，JQuery将自动替换后一个“?”为正确的函数名，以执行回调函数。
			text：返回纯文本字符串。
        */
        url: "http://localhost:8080/user",//url
        data: $('#formtest').serialize(),//这个是form表单中的id   jQuery的serialize()方法通过序列化表单值
        success: function (result) {
        	alert("成功")
            console.log(result);//打印服务端返回的数据(调试用)
            if (result.resultCode == 200) {
                alert("SUCCESS");
            }
            ;
        },
        error : function(s,s2,s3) {
			//数据成功传到后台 也有返回值 但就是报错 parsererror ：参考
			https://blog.csdn.net/AinGates/article/details/75250223 / 
			https://blog.csdn.net/AinGates/article/details/75250223
        	/*
        	    写了一个ajax方法，后台一切正常，通过浏览器的F12工具查看XMLHttpRequest.status返回200，XMLHttpRequest.readyState返回4，也都没有问题。但是回调函数跳到error里，报parsererror的错误。经过排查，发现是因为后台返回时用了@ResponseBody注解（SpringMVC返回json格式的注解），但前台ajax提交没有定义dataType属性（定义服务器返回的数据类型）

			    还有一种情况是ajax方法中定义了 dataType:"json"属性，就一定要返回标准格式的json字符串，要不jQuery1.4+以上版本会报错的，因为不是用eval生成对象了，用的JSON.parse，如果字符串不标准就会报错。比如只返回一个简单的字符串“success”，“fail”， true，false，并不是标准的json字符串就会报错。
			
		               首先，jQuery 1.4版本之后对服务端返回的JSON 数据要求比较严格，必须严格按照JSON的标准来了。
        	*/
			
			console.log(s)
        	console.log(s2)
        	console.log(s3)
        	
            alert("异常！");
        }
    });
}
</script>

</body>

</html>

```

### —Form表单常用属性

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Insert title here</title>
</head>
<body>
<!--form表单中的属性： 
     accept-charset  作用： 规定服务器可处理的表单数据字符集。   常用值： UTF-8 - Unicode 字符编码   、ISO-8859-1 - 拉丁字母表的字符编码 、 gb2312 - 简体中文字符集       
     action  作用：规定当提交表单时向何处发送表单数据。  可能的值： 绝对 URL - 指向其他站点（比如 src="www.example.com/example.htm"）、相对 URL - 指向站点内的文件（比如 src="example.htm"）
     autocomplete  作用：规定是否启用表单的自动完成功能。
     enctype 作用：规定在发送表单数据之前如何对其进行编码  enctype 属性可能的值：  application/x-www-form-urlencoded    multipart/form-data   text/plain
 	 method 作用：规定用于发送 form-data 的 HTTP 方法     常用值:get / post
 	 name 作用：规定表单的名称。
 	 novalidate 作用：如果使用该属性，则提交表单时不进行验证。  使用方式 ： novalidate="novalidate"
 	 target 作用：规定在何处打开 action URL。 常用值： _blank：在新窗口中打开。    _self：默认。在相同的框架中打开。   _parent：在父框架集中打开。  _top：在整个窗口中打开。   framename：在指定的框架中打开。 
 -->
<form>
<!--常用的表单元素   form   表单  input   表单元素，表单项     select和option  下拉菜单      textarea 文本域  -->
	<!-- input 属性 ：  
		value 属性规定输入字段的初始值
		readonly 属性规定输入字段为只读（不能修改）
		disabled 属性规定输入字段是禁用的。  被禁用的元素是不可用和不可点击的。  被禁用的元素不会被提交。  disabled 属性不需要值。它等同于 disabled="disabled"。
		size 属性规定输入字段的尺寸
		maxlength 属性规定输入字段允许的最大长度
		H5之后添加的属性
		autocomplete 属性规定表单或输入字段是否应该自动完成。  当自动完成开启，浏览器会基于用户之前的输入值自动填写值。
					提示：您可以把表单的 autocomplete 设置为 on，同时把特定的输入字段设置为 off，反之亦然。
			        autocomplete 属性适用于 <form> 以及如下 <input> 类型：text、search、url、tel、email、password、datepickers、range 以及 color。
					例子  <form action="action_page.php" autocomplete="on">   First name:<input type="text" name="fname"><br>  E-mail: <input type="email" name="email" autocomplete="off"><br>  </form> 
		autofocus 属性是布尔属性。  如果设置，则规定当页面加载时 <input> 元素应该自动获得焦点。
		form 属性规定 <input> 元素所属的一个或多个表单。   提示：如需引用一个以上的表单，请使用空格分隔的表单 id 列表。
		formaction 属性规定当提交表单时处理该输入控件的文件的 URL。  
					formaction 属性覆盖 <form> 元素的 action 属性。     
					formaction 属性适用于 type="submit" 以及 type="image"
		formenctype 属性规定当把表单数据（form-data）提交至服务器时如何对其进行编码（仅针对 method="post" 的表单）。
					formenctype 属性覆盖 <form> 元素的 enctype 属性。
					formenctype 属性适用于 type="submit" 以及 type="image"。
		formmethod 属性定义用以向 action URL 发送表单数据（form-data）的 HTTP 方法。
					formmethod 属性覆盖 <form> 元素的 method 属性。
					formmethod 属性适用于 type="submit" 以及 type="image"。
	    formnovalidate 属性
					novalidate 属性是布尔属性。
					如果设置，则规定在提交表单时不对 <input> 元素进行验证。
					formnovalidate 属性覆盖 <form> 元素的 novalidate 属性。
					formnovalidate 属性可用于 type="submit"。
		formtarget 属性规定的名称或关键词指示提交表单后在何处显示接收到的响应。
					formtarget 属性会覆盖 <form> 元素的 target 属性。
					formtarget 属性可与 type="submit" 和 type="image" 使用。			
		height 和 width 属性规定 <input> 元素的高度和宽度。   height 和 width 属性仅用于 <input type="image">。
					注释：请始终规定图像的尺寸。如果浏览器不清楚图像尺寸，则页面会在图像加载时闪烁。
		min 和 max 属性规定 <input> 元素的最小值和最大值。
					min 和 max 属性适用于如需输入类型：number、range、date、datetime、datetime-local、month、time 以及 week。
		multiple 属性是布尔属性。    如果设置，则规定允许用户在 <input> 元素中输入一个以上的值。
					multiple 属性适用于以下输入类型：email 和 file。
		pattern 属性规定用于检查 <input> 元素值的正则表达式。    pattern 属性适用于以下输入类型：text、search、url、tel、email、and password。
		placeholder 属性规定用以描述输入字段预期值的提示（样本值或有关格式的简短描述）。  该提示会在用户输入值之前显示在输入字段中。
					placeholder 属性适用于以下输入类型：text、search、url、tel、email 以及 password。
		required 属性是布尔属性。   如果设置，则规定在提交表单之前必须填写输入字段。
					required 属性适用于以下输入类型：text、search、url、tel、email、password、date pickers、number、checkbox、radio、and file.
		step 属性规定 <input> 元素的合法数字间隔。     示例：如果 step="3"，则合法数字应该是 -3、0、3、6、等等。
		
		
	-->
	
	<!-- 在form标签中添加Action(提交的地址)和method(post),且有一个submit按钮（<input type=’submit’>）就可以进行数据的提交，每一个input标签都需要有一个name属性，才能进行提交 -->
	
	<!-- 用户名  type 是类型  name -->
	First name: <input type="text" name="firstname"><br>
	Last nameee: <input type="text" name="lastname"><br>
	<!-- 密码 -->
	Password: <input type="password" name="pwd"><br><br>
	<!-- 单选按钮 -->
	性别：<input type="radio" name="sex" value="male">Male
	<input type="radio" name="sex" value="female">Female<br><br>
	<!-- 复选框 -->
	爱好：<input type="checkbox" name="vehicle" value="Bike">I have a bike
	<input type="checkbox" name="vehicle" value="Car">I have a car <br><br>
	<!-- 文件域 -->
	选择文件：<input type="file" name="newfile"> <br><br>
	
	<!-- 隐藏域  这个在页面上不可加 可以保存一些不需要显示的隐藏信息 用于传递值-->
	<input type="hidden" name="newhidden">
	<!-- 将表单里的信息清空 重新填写 -->
	<input type="reset" value="清空表单"><br><br>
		<!-- 用来设置一个按钮 这个按钮没有提价功能 -->
	<input type="button" value="注册">
	<!--这个不常用    图片提交按钮 点击这个与点击submit效果相同    插入图片用 img标签 而不是input标签-->
	<input type="image" name="newimg" ><br><br>
	<!--常用   提交按钮  type 是类型  value 是按钮显示的内容-->
	<input type="submit" value="Submit"><br><br>
	<!--
	 type=image和type=submit的异同：
	都可以相应回车，并且都能提交。
	区别就是type=image的input提交方式会把按钮点击的位置坐标x,y提交过去。
	对于通常的表单应用来说，这样多一两个参数并没有问题，因为我们在接收端中都是按照指定的名称来处理参数，
	所以即使多了两个参数也不会有任何问题。
         但是在做支付接口的时候（例如：支付宝接口）你就会发现，多出两个隐藏参数会带来很麻烦的问题，
         因为在在提交表单之后，接收端会对参数名称进行MD5校验，想想多两个参数会带来什么问题。
         将会直接导致表单校验不通过，然后支付失败的问题。
     
         所以在在通常网站开发中不提倡使用type=image作为表单的提交按钮。
 -->
</form>
</body>
</html>
```

