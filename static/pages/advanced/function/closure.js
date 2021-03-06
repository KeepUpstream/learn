console.log("--------------------------------------------------------------eg.01")
function fn(){
	var max=10;
	return function bar(x){
		if(x>max){
			console.log(x);
		}
	}
}
var f1=fn(),max=100;
f1(15);
//这个闭包（函数+词法环境）的max=10

var max=6,fun = function(x){
	if(x>max){
		console.log(x);
	}
};
(function(f){
	var max=12;
	f(8);
})(fun);
//这个闭包的max=6

function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);
console.log(add5(2));  // 7
console.log(add10(2)); // 12

console.log("--------------------------------------------------------------eg.02")
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}
var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

console.log("--------------------------------------------------------------eg.03")
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();
console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1

console.log("--------------------------------------------------------------eg.04常见错误")
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];    //var 声明的变量，它的作用域在函数体内，而不是块内
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}
//setupHelp();
//如果你运行上面的代码，就会发现，不论你选择哪个输入框，最终显示的提示信息都是 “Your age”。
//原因就是：我们赋值给 onfocus 事件的是三个闭包。这三个闭包由函数和 setUpHelp() 函数内的环境组成。
//当 onfocus 的回调执行时，item.help 的值才确定。那时循环已经结束，三个闭包共享的 item 对象已经指向了 helpText 列表中的最后一项。
function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp2() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);    //这里使用一个函数工厂
  }
}
setupHelp2();

function setupHelp3() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 立即调用绑定函数，使用正确的值绑定到事件上；而不是使用循环结束的值
  }
}
setupHelp3();

//不想使用闭包的话，可以用let限制item作用域只在当前块内

console.log("--------------------------------------------------------------eg.05性能优化")
//在不是必需的情况下，在其它函数中创建函数是不明智的。因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。
//比如，在创建新的对象或者类时，方法通常应该关联到对象的原型，而不是定义到对象的构造器中。因为这将导致每次构造器被调用，方法都会被重新赋值一次（也就是说，创建每一个对象时都会重新为方法赋值）。
function MyObject(name, message) {
  	this.name = name.toString();
  	this.message = message.toString();
  	this.getName = function() {
    	return this.name;
  	};

  	this.getMessage = function() {
    	return this.message;
  	};
}
//优化：
function MyObject(name, message) {
  	this.name = name.toString();
  	this.message = message.toString();
}
MyObject.prototype = {
  	getName: function() {
  	  return this.name;
  	},
  	getMessage: function() {
    	return this.message;
  	}
};
//然而一般来说，不建议重定义原型。下面的代码将属性添加到已有的原型上
function MyObject(name, message) {
  	this.name = name.toString();
  	this.message = message.toString();
}
MyObject.prototype.getName = function() {
  	return this.name;
};
MyObject.prototype.getMessage = function() {
  	return this.message;
};
//或
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
(function() {
    this.getName = function() {
        return this.name;
    };
    this.getMessage = function() {
        return this.message;
    };
}).call(MyObject.prototype);
