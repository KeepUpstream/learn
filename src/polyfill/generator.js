//generator|yeild 生成器如何使用？各阶段的变化
/**
 * generator是用function* funcName(){yield a;}来定义的一个函数，他调用后不会立即执行，而是返回一个迭代器对象控制生成器的一步步执行
 * 操作迭代器对象有两种方式：
 * 1. next() 遇到yield便返回一个对象{value:x,done:true|false},若done为true可继续调用next方法，若为false则返回值的value为undefined
 * 2. for(var x of iterator)
 * 状态变化：
 * 每当执行到yield属性都返回一个对象，此时迭代器处于非阻塞的挂起状态
 * 调用next方法时，生成器又从挂起状态改为执行状态，继续上一次的执行位置执行
 * 直到yield没有了，就会返回一个结果对象
 * 
 */

//输出斐波那契数列 0 1 1 2 3 5 8 13
function fib(max){
	var arr=[0,1];
	while(arr.length<max){
		arr.push(arr[arr.length-1]+arr.length-2)
	}
	return arr;
}
//函数只能返回一次，所以必须返回一个Array，改用generator
function* fibGenerator(max){
	var a=0,b=1,n=0;
	while(n<max){
		yield a;
		[a,b]=[b,a+b];
		n++;
	}
	return;
}
var fg=fibGenerator(5);//只是生成一个迭代器对象
//next()方法，每次遇到yield就返回一个对象{
//	value:返回值,
//	done:true|false 代表迭代器是否迭代结束	
// }
fg.next();
fg.next();
fg.next();
fg.next();
fg.next();
//for...of循环迭代generator对象，这种方式不需要自己判断done
for(var x of fib(6)){
	console.log(x)
}

//用处
//(1) 与普通函数的区别在于它可以多次返回，他可以记住执行状态的函数，可用于实现需要用面向对象才能实现的功能
var fibRS = {
	a:0,
	b:1,
	n:0,
	max:5,
	next:function(){
		var r = this.a,t=this.a+this.b;
		this.a = this.b;
		this.b = t;
		if(this.n < this.max){
			this.n++;
			return r;
		}else{
			return undefined;
		}
	}
}//可见，用对象的属性来保存状态相当繁琐
//（2）可以把一部代码变成“同步”代码
try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
}
catch (err) {
    handle(err);
}

//for...in  for...of
var array = ['Bob','Lily','David']
undefined
Array.prototype.method=function(){console.log(1)}
array.name='this is an array'
for(var key in array){console.log(key)}
for(var key of array){console.log(key)}


