//函数柯里化
//将接受多个参数的函数处理成接受单一参数的函数（单一参数为参数列表中的第一个）
//函数柯里化思想：进行JS预处理，降低通用性，提高适用性
function add(x, y) {
	return x + y;
}
//柯里化add
function addCurrying(x) {
	return function (y) {
		return x + y;
	}
}
addCurrying(3)(5)

/**
 * 用途：
 * 1）参数复用：需要输入多个参数，最终只需输入一个，其余通过arguments来获取
 * 2）提前确认：避免重复去判断某一个条件是否符合，不符合则return，不再继续执行下面的操作
 * 3）延迟执行bind实现
 */

// 正则表达式 reg.test(str)
function check(reg, str) {
	return reg.test(str);

}
check(/\d+/i, "123id")
check(/[a-z]+/i, "sdfsd")

function checkCurrying(reg) {
	return function (str) {
		return reg.test(str);
	}
}
var hasNumber = checkCurrying(/\d+/i);//检查是否含有数字
var hasAlpha = checkCurrying(/[a-z]+/i);
hasNumber("1232")
hasAlpha("ddss")
hasAlpha("2323")

//提前返回，对于监听事件的判断则只会走一次，如果是传统函数则会多次执行
var addEvent = function () {
	if (window.addEventListener) { //判断是否支持
		console.log("window.addEventListener");
		return function (el, sType, fn, capture) {
			el.addEventListener(sType, function (e) {
				fn.call(el, e);
			}, (capture));
		};
	} else if (window.attachEvent) {
		console.log("window.attachEvent");
		return function (el, sType, fn, capture) {
			el.attachEvent("on" + sType, function (e) {
				fn.call(el, e);
			});
		};
	}
};
var addEvent2 = function(el, sType, fn, capture){
	if(window.addEventListener){
		console.log("传统：addEventListener");
		if(el && sType && fn){
			el.addEventListener(sType, fn, capture||false);
		}
	}else if(window.attachEvent){
		console.log("传统：attachEvent");
		if(el && sType && fn && capture){
			el.attachEvent("on"+sType,function(e){
				fn.call(el,e);
			})
		}
	}
}
var elBind = addEvent();
var p1 = document.getElementById("s");
var p2 = document.getElementById("d");
//elBind(p1, 'click', function () { console.log(this.innerText) }, false)
// elBind(p2, 'click', function () { console.log(this.innerText) }, false)

addEvent2(p1, 'click', function () { console.log(this.innerText) }, false)
addEvent2(p2, 'click', function () { console.log(this.innerText) }, false)
//延迟执行 bind不再示例

/**
 * 封装通用函数柯里化方法
 * @param {*} fn 
 * @returns 
 */
var currying = function (fn) {
	var args = [];
	return function fnn() {
		if (arguments.length === 0) {
			return fn.apply(this, args);
		}
		console.log(arguments);
		// Array.prototype.push.apply(args,[].slice.call(arguments))
		args.push(...[].slice.call(arguments));
		console.log(args);
		return fnn;
	}
}
function add3(a, b, c) {
	console.log(a + b + c);
}
var s = currying(add3);
s(1)(2)(3)();






//支持多参数
function curryingFunction(fn, args) {
	var _this = this;
	var len = fn.length; //函数fn的传参列表个数
	var args = args || [];
	return function () {
		var _args = [].slice.call(arguments);
		args.push(_args);

		if (_args.length < len) {
			return curryingFunction.call(_this, fn, _args);
		} else {
			return fn.apply(_this, _args);
		}
	}
}
