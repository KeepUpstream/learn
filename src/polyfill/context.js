Function.prototype.myCall = function(context){
	if(typeof this !== 'function'){
		throw new Error("Not a function");
	}
	context = context || window;//参数使用解构赋值有问题
	context.fn = this;
	let args = Array.prototype.slice.call(arguments,1);
	let res = context.fn(...args);
	delete context.fn;
	return res;
}

Function.prototype.myApply = function(context){
	if(typeof this !== 'function'){
		throw new Error("Not a function");
	}
	context = context || window;
	context.fn = this;
	let res;
	if(arguments[1]){//不判断贸然传参会报错
		res = context.fn(...arguments[1]);
	}else{
		res = context.fn();
	}
	
	delete context.fn;
	return res;
}

Function.prototype.myBind = function(context){
	if(typeof this !== 'function'){
		throw new Error("Not a function");
	}
	//保存调用myBind的函数
	const _this = this;
	const args = Array.prototype.slice.call(arguments,1);
	return function F(){
		if(this instanceof F){
			//new F()时，this指向新创建的实例对象
			//如果是new出来的，返回空对象且__proto__指向_this的prototype，且完成函数柯里化
			return new _this(...args,...arguments);
		}else{
			//不明白 为何要concat？
			return _this.apply(context,args.concat(...arguments));
		}
	}
}

var obj = {name:"Smiley"};
var greeting = function(str, lang){
    this.value = 'greetingValue';
    console.log("Welcome "+this.name+" to "+str+" in "+lang);
};
var objGreeting = greeting.myBind(obj, 'the world'); 
var newObj = new objGreeting('JS');
console.log(newObj.value);
objGreeting("Java");

//https://zhuanlan.zhihu.com/p/85438296
Function.prototype.myBind = function() {
    var thatFunc = this, 
        context = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1)
    if (typeof thatFunc !== 'function') {
        throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    var fBound  = function() {
        return thatFunc.apply(this instanceof fBound
                 ? this
                 : context,
                 args.concat(Array.prototype.slice.call(arguments)));
        };
	//fNOP和greeting使用同一个prototype，而fBound.prototype实际上是fNOP的一个实例，而这个实例的__proto__才指向的是greeting.prototype。
	//因此，直接修改fBound.prototype并不会修改greeting的prototype。
    var fNOP = function() {};
    if (thatFunc.prototype) {
      fNOP.prototype = thatFunc.prototype; 
    }
    fBound.prototype = new fNOP();
    return fBound;
}

//实现new
function myNew(fn,...args){
	var obj = {};
	obj.__proto__ = fn.prototype;
	let res = fn.apply(obj,args);
	return res instanceof Object? res:obj;
}

//实现instanceof
function myInstanceof(obj,Func){
	if(!(Func instanceof Object)){
		throw new Error("Right-hand side of 'instanceof' is not an object");
	}
	let objProto = obj.__proto__;
	let FuncPrototype = Func.prototype;
	while(true){
		if(objProto){
			if(objProto === FuncPrototype){
				return true;
			}else objProto = objProto.__proto__;
		}else{
			return false;
		}
	}
}

function myInstance(L, R) {//L代表instanceof左边，R代表右边
	if(!(R instanceof Object)){
		throw new Error("Right-hand side of 'instanceof' is not an object");
	}
	var RP = R.prototype
	var LP = L.__proto__
	while (true) {
	  if(LP == null) {
		return false
	  }
	  if(LP == RP) {
		return true
	  }
	  LP = LP.__proto__
	}
  }
  console.log(myInstance({},Object)); 
  
