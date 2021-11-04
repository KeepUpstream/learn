var pd = Object.getOwnPropertyDescriptor;
var log = console.log;

var string = '我是字符串',object={desc:"我是对象"};
var x = y = 10,d=666; //使用var和不使用var定义的全局变量的configurable值不一样
z = 100;
var a = 1; 
let b = 2;
const c = 3;
const ME = {age:25,name:"aihui",ss:[1,2,3]};
const ARR = ["bob","David"];
const num = 2, obj = { a: 1 };
log(pd(window, 'num'), pd(window, 'obj'))//const定义变量并不在window上

function getX(){
	log(this.x);
}

var dd = ME;dd.age = 22;
log("ME.age:",ME.age)
var o = ARR;
o.length =1;
log("ARR:",ARR.join());

debugger
log(pd(window, 'x'))	//configurable=false 即使delete也能再访问
log(pd(window, 'y'))	//configurable=true 可以删除，删除后不能再访问
test(x,null,z)

function test(x,y,z='zzz',d) {debugger
	log("对于入参：",x,y,z,d);
	log("对于函数内没有的变量：",string,object); //观察d和string的访问结果

	log("i:",i);
	var i = 3;
	
	//log(e) //let不存在变量提升，所以它存在暂时性死区
	let e = 55;
	function getD(){
		log("this.d:",this.d);
		log("d:",d);
	}
	getX();
	getD()

	x = 'x';
	log("x:",x);

	obj.a = '函数内改变a的值为aaaa';
	obj.c = '函数内为对象新增属性c';
}
log("x:",x);
log("obj:",obj);
delete x; log(x)
delete y;//log(y) //Uncaught ReferenceError: y is not defined

for (var i = 0; i < c; i++) {
	setTimeout(function () {  // 同步注册回调函数到 异步的 宏任务队列。
		console.log(i);        // 执行此代码时，同步代码for循环已经执行完成
	}, 0);
}
for (let i = 0; i < c; i++) {
	setTimeout(function () {  // 同步注册回调函数到 异步的 宏任务队列。
		console.log(i);        // 执行此代码时，同步代码for循环已经执行完成
	}, 0);
}
