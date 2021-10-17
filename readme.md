# 夯实基础
## 1.数据类型
基本数据类型
null、undefined、Boolean、Number、String
引用数据类型
Object、Array、Date、RegExp、Function、Math

#### 数据类型判断
（1）typeof x
（2）obj instanceof Object|Array|Function|Date|RegExp
（3）Object.prototype.toString.call(x)
（4）constructor
工具类参考utils/typeJS.js(顔海镜)

#### 数据类型转换
##### 类型转换
转字符串:
```js
//(1).toString	null和undefined不可转
false.toString()	//'false'
''.toString()		//''
(0).toString()		//'0'
[1,2,,null,false,undefined].toString()	//"1,2,,false,,"
({a:1,b:'dd',c:null,d:undefined,e:[1,2],f:{f1:22},g:false}).toString() //'[object Object]'
//(2)String(a)		都可转'a',结果同上
//(3)隐式转换 	+''
```
转数值类型
```js
//(1) parseInt(num)|parseFloat(num) 可将任意值转为数字，若要转换的是字符串，会解析直到遇到非数字结束，如果第一个字符不是数字则返回NaN
parseFloat()和parseInt非常相似，不同之处在与parseFloat会解析第一个. 遇到第二个.或者非数字结束如果解析的内容里只有整数，解析成整数。
parseInt(''|null|undefined|{}|[])	//NaN,但
parseInt(['22','3'])结果为22
//（2）Number(a)
Number(false|null|[]|'')	//0
Number(undefined|{})		//NaN
//（3）隐式转换
'222'-0   '222'/1
```

转换布尔类型

```js
//(1) Boolean(obj)
Boolean(0|null|undefined|'')	//false
Boolean({}|[])	//true
//（2）if(a) 条件表达式 !a
```

##### xx.valueOf() 和 xx.toString()转换

（1）valueOf()方法用来把对象转换成原始类型的值（数值、布尔和字符串），默认情况下，它会被每个对象继承。每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果没有原始值就返回对象自身。

（2）每个对象都有一个toString()方法，当“对象被表示为文本时”或“当以期望字符串的字符串方式引用对象时”，该方法会被自动调用。

```js
[].toString()			//''
[2,3].toString()	//'2,3'
Math.toString()	//'[object Math]'
Date.toString()	//'function Date() { [native code] }'
RegExp.toString()//'function RegExp() { [native code] }'
```

##### 隐式类型转换优先级



#### 深拷贝问题


## 2.原型及原型链

## 3.闭包



# 高级进阶
## 类和继承

## HTTP请求

## 数据存储

## 浏览器原理
