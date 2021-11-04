# 一、夯实基础
## 1.1 变量及作用域

### 1.1.1 数据类型

**基本数据类型**
null、undefined、boolean、number、string
**引用数据类型**
Object、Array、Date、RegExp、Function、Math

#### 1. 数据类型判断

```js
//（1）typeof x 【不能区分null和Object类型】
typeof undefined
'undefined'
typeof null
'object'
typeof []
'object'
typeof function(){}
'function'
typeof {}
'object'
typeof 1
'number'
typeof Number(1)
'number'
typeof ''
'string'
typeof String()
'string'
typeof false
'boolean'
typeof Boolean(false)
'boolean'

//（2）obj instanceof Object|Array|Function|Date|RegExp
null instanceof Object
false
undefined instanceof Object
false
1 instanceof Number
false
false instanceof Boolean
false
'' instanceof String
false
String instanceof Object
true
Array instanceof Object
true
Date instanceof Object
true
Function instanceof Object
true
RegExp instanceof Object
true

//（3）Object.prototype.toString.call(x)

//（4）constructor

```

工具类参考utils/typeJS.js(顔海镜)

#### 2. 数据类型转换

转字符串

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

**xx.valueOf() 和 xx.toString()转换**

（1）valueOf()方法用来把对象转换成原始类型的值（数值、布尔和字符串），默认情况下，它会被每个对象继承。每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果没有原始值就返回对象自身。

（2）每个对象都有一个toString()方法，当“对象被表示为文本时”或“当以期望字符串的字符串方式引用对象时”，该方法会被自动调用。

```js
[].toString()			//''
[2,3].toString()	//'2,3'
Math.toString()	//'[object Math]'
Date.toString()	//'function Date() { [native code] }'
RegExp.toString()//'function RegExp() { [native code] }'
```

**隐式类型转换优先级**

![数据类型运算及转换](./image-js/数据类型运算及转换.png)

```js
//+
2+false			//2
2+true			//3
2+''				//'2'
2+undefined	//NaN
2+null			//2
typeof(2+null)	//'number'
2+[]				//'2'
2+{}				//'2[object Object]'
{}+2				//2
typeof({}+2)//'string'
{}+2+3			//5

//x或y是复杂数据类型 : 会先获取复杂数据类型的原始值之后再左比较
//复杂数据类型的原始值： 先调用valueOf方法，然后调用toString方法
//valueOf:一般默认返回自身
//数组的toString：默认会调用join方法拼接每个元素并且返回拼接后的字符串
[ 1, 2, 3 ] == "1,2,3"	//true
{} == '[object Object]'//true
//==
null===null	//true
undefined === undefined	//true
null == undefined		//true
null === undefined	//false
NaN === NaN	//false
NaN == NaN	//false
true == 1		//true
true == 2		//false 由此可见，bool和Number比较，应该是转数字
[] == 0		//true
{} == 0		//VM515:1 Uncaught SyntaxError: Unexpected token '=='
![] == 0	//true
!{} === false//true
```

面试题

```js
//注意:八种情况转boolean得到false: 0 -0 NaN undefined null '' false document.all()

console.log([] == 0); //true 
  // 分析:(1) [].valueOf().toString() == 0  (2) Number('') == 0  (3) false == 0  (4) 0 == 0
console.log(![] == 0); //true
  // 分析: 逻辑非优先级高于关系运算符 ![] = false (空数组转布尔值得到true)
        
console.log([] == []); //false
console.log([] == ![]); //true
// [] 与右边逻辑非表达式结果比较
//(1) [] == !Boolean([])   (2) [] == !true  (3)[] == false  (4) [].toString() == false  (5)'' == false   (6)Number('0') == Number(false)
Boolean([])
true
Boolean({})
true

console.log({} == {}); //false
console.log({} == !{}); //false
// {} 与右边逻辑非表达式结果比较
//(1){} == !{} (2){} == !true  (3){} == false  (4){}.toString() == false  (5)'[object Object]' == false  (6)Number('[object Object]') == false
```

### 1.1.2 变量

#### 1. 变量的命名规则

​        变量必须以字母开头，也可以用$和_开头（但是不推荐使用）

​        变量名称对大小写敏感

​        可以用驼峰法命名

**声明变量的关键字**

- var
- let
- const

#### 2. 变量的声明和赋值



##### **变量提升**

​		在ES5版本及之前，JavaScript中只有全局作用局和函数作用域，if等代码块内声明的变量作用在if语句所在作用域。所以我们存在以下场景：

- 在函数内访问一个函数内没有定义的变量时，会从函数的上一层作用域内寻找，直至找到或遍历到window；
- 在函数内访问一个函数内部有且和外部变量重名的变量时，会存在变量的提升，即在进入函数内部时会创建一个新的变量，其值为undefined，等执行到真正的赋值语句时才进行赋值；
- let、const声明的变量及函数表达式不进行提升，存在暂时性死区；

```js
var v='Hello World';
(function(){
    alert(v);
})()
//输出：Hello World

var v='Hello World';
(function(){
    alert(v);
    var v='I love you';
})()
//输出undefined

function foo() {
    var x = 1;
    if (x) {
        (function () {
            var x = 2;
            // some other code
        }());
    }
    // x is still 1.
}
```



##### **暂时性死区**

​		当程序的控制流程在进入新的作用域进行实例化时，作用域中用let、const创建的变量虽然先被创建出来，但还未进行词法绑定，所以不能访问。在主流程进入作用域创建变量到变量可以被访问这一段区间称为“暂时性死区”。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。凡是在声明之前就使用这些变量，就会报错。

#####  变量作用域

```js
var a = 100;     
  
 func();
 
 function func(){
     console.log(a);
     var a=200;        
     console.log(a);
 }

var a=100;
var obj1={
    attr:'hello'
};
func(a,obj1);
function func(num,obj){
    var a2=num;
    a2=200;

    var obj2=obj;
    obj2.attr='hello222';
}
console.log(a);	//100
console.log(obj1.attr);	//hello222

```

**使用var定义与不使用var定义**

```js
//注意观察configurable
obj = {
  a:2,
  b:[1,2,3],
  c:{c1:23}
}
Object.getOwnPropertyDescriptor(window,"obj")
{value: {…}, writable: true, enumerable: true, configurable: true}configurable: trueenumerable: truevalue: {a: 2, b: Array(3), c: {…}}writable: true[[Prototype]]: Object

var obj2 = obj
Object.getOwnPropertyDescriptor(window,"obj2")
{value: {…}, writable: true, enumerable: true, configurable: false}configurable: falseenumerable: truevalue: {a: 111, b: Array(3), c: {…}}writable: true[[Prototype]]: Object
window.obj
```



#### 3. 变量的存储

​		内存分为栈（stack）和堆（heap）、池(一般也会归类为栈中)。其中，栈存放变量，堆存放复杂对象，池存放常量。

**栈**是只能在某端进行插入和删除的数据结构，进出栈的一端称为栈顶，另一端为栈底，具有”先进后出“的特点。

优点：存取速度快，速度仅次于CPU的寄存器，适于查询；

缺点：栈中的数据大小和生存期必须是确定的，缺乏灵活性。

**堆**用于动态分配和释放程序声明对象所使用的空间。

优点：生存期不必实现告诉编译器，垃圾收集器自动回收不再使用的数据，释放存储空间；

缺点：在运行时动态分配内存，存取速度较慢。

​		JS中的数据分简单|基本数据类型和引用数据类型。

**简单类型数据**占用内存比较小，适合放在栈中。

- 值有固定大小，往往存储在栈中（变量名和变量值，闭包除外），由系统自动分配存储空间；
- 值与值之间相互独立，修改一个变量不会影响其他变量。

**引用类型数据**JS是弱类型语言，Array大小可动态改变，对于值大小不固定的对象，适于放在堆中。

- 数据保存在堆中，然后栈中存储变量名和指向堆中数据的引用（地址指针），每创建一个新的引用类型数据，就会在堆内存中开辟一个新的空间；
- 变量保存的是引用地址，如果两个变量保存的是对同一个对象的引用，当一个变量修改属性时，另一个也会收到影响。
- 当清空一个变量的值时，指示断开该变量与对象的联系，另一个对象并不受影响。

*所以，在进行数据比较的时候，如果是===比较的时候需要先比较数据类型，再比较值；如果是==比较，如果都是基本数据类型，则直接比较值，如果类型不同，则先进行类型转换再进行比较。*

##### 内存分配

当我们声明变量、函数或对象时，系统自动为他们分配内存。

##### 内存使用

读写内存使用变量、函数、对象等。

##### 内存回收

JS有自动垃圾收集机制，找出不再使用的值，释放其占用的内存。垃圾收集器每隔固定时间段就执行一次释放操作。

- 在局部作用域中，函数执行完毕，局部变量没有存在的必要了，因此垃圾收集器很容易做出判断并回收。但是全部变量何时需要释放内存空间很难判断，所以我们在开发时要尽量避免使用全局变量，适当时候解除引用以确保性能。
- “引用计数”方法是记录所有值被引用的次数，但是对于代码中使用循环引用时，算法就会导致问题一直无法释放内存，主流引擎已不使用；
- “标签清除”是目前主流的垃圾收集算法，是给当前不使用的值加上标记，然后再回收其内存；
- 解除变量引用不仅可以消除循环引用现象，而且可以及时进行垃圾回收。通常我们将变量置为null使数值脱离执行环境，在下一次垃圾回收时释放空间。
- Google V8引擎的所有对象都是通过堆来进行内存分配的，当我们在声明对象并赋值时，V8引擎就会堆内存中分配一部分给这个变量。如果 已申请的内存不足以存储变量时，V8引擎就会继续申请内存，直到堆的大小达到V8引擎内存上限（默认64位系统中为1463MB，32位系统中为732MB）。另外，V8引擎对JS对象进行分代管理。
  - 新生代——存活周期较短的JS对象，如：临时变量、字符串等；
  - 老生代——为经过多次垃圾回收仍然存活，存活周期较长的对象，如：主控制器、服务器对象等。

```js
var b1="eye";
var b2="ear";
var b3="arm"; 
var old=[b1,b2,b3];
var newer=old;
newer	//['eye', 'ear', 'arm']
b1='foot'
newer	//['eye', 'ear', 'arm']

function fun1() {
    var obj = {name: 'csa', age: 24};
}
function fun2() {
    var obj = {name: 'coder', age: 2}
    return obj;
}

var f1 = fun1();
var f2 = fun2();
f1	//undefined
f2	//{name: 'coder', age: 2}
obj1//VM438:1 Uncaught ReferenceError: obj1 is not defined at <anonymous>:1:1（匿名） @ VM438:1
obj2//{a: 111, b: Array(3), c: {…}}
obj2=null
obj2	//undefined
```

#### 4. 深拷贝问题



#### 5. 数据精度问题

bigInt







## 1.3 函数和闭包

### 1.3.1 函数调用传参&返回值



### 1.3.2 arguments参数&剩余参数



### 1.3.3 展开运算符与结构赋值

### 1.3.4 函数作用域和执行上下文

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
- 箭头函数本身没有this，this继承上级的this。
- 定时器中箭头函数的this指向包含定时器的函数

### 1.3.5 纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

```
一个函数在执行过程中还有很多方式产生外部可观察的变化，比如：
1.修改外部变量（全局|对象的）；
2.比如说调用 DOM API 修改页面；
3.或者你发送了 Ajax 请求；
4.还有调用 window.reload 刷新浏览器，
5.甚至是 console.log 往控制台打印数据也是副作用
```





# 二、高级进阶
## 2.1 闭包



## 2.2 原型及原型链



## 2.3 类和继承



## 2.4 异步

### 2.4.1 回调函数

Promise

### 2.4.2 事件监听

### 2.4.3 定时器

### 2.4.4 发布订阅模式

