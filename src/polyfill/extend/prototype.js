/**
 * 【原型】
 * JavaScript的函数有一个prototype属性称为原型，属性值是一个对象；
 * 当函数对象作为构造函数创建实例时，实例对象的内部属性（隐式原型）__proto__属性指向构造函数的prototype属性；
 * 当然，函数作为对象，也有__proto__属性。
 * 【原型链】
 * 当一个对象调用自身不存在的属性|方法时，就会去自己的__proto__关联的prototype对象上去找，以此类推，
 * 直到找到属性|方法返回或查找到顶层Object.prototype上返回null为止，这个过程形成所谓的“原型链”。
 * 
 * 当我们在控制台输入某个函数func.prototype时，会得到该函数的构造器constructor及原型__proto__(默认原型为Object.prototype)
 * constructor：每个实例对象都从原型中继承了一个constructor属性，该属性指向了用于构造此实例对象的构造函数。
 * prototype 属性值是一个对象，我们希望被原型链下游的对象继承的属性和方法都被储存在其中，比如：
 * Object.prototype.constructor
 * Object.prototype.hasOwnProperty
 * Object.prototype.isPrototypeOf
 * Object.prototype.propertyIsEnumerable
 * Object.prototype.toLocalString
 * Object.prototype.toString
 * Object.prototype.value
 * 以及被废弃的__defineGetter__、__defineSetter__、__lookupGetter__、__lookupSetter__、__proto__等 
 * Object.is()、Object.keys()以及其他不在 prototype 对象内的成员，仅能被 Object构造器自身使用，不会被“对象实例”或“继承自 Object的对象类型”所继承。
 * 我们可以通过func.prototype.prop=xx的形式向函数原型上添加属性；也可以通过new func()创建一个func的示例，它会返回一个实例化对象，可以继续向这个实例添加一些对象
 * 只有函数才有prototype属性，实例没有，但它有__proto__
 * 原型链：这种继承模型下，上游对象的方法不会复制到下游的对象实例中；下游对象本身虽然没有定义这些方法，但浏览器会通过上溯原型链、从上游对象中找到它们。这种继承模型提供了一个强大而可扩展的功能系统。	
 * 【继承】的实现方式：
 * 1.构造函数继承
 * 2.原型链继承
 * 3.实例继承
 * 4.拷贝继承
 * 5.组合继承
 * 6.寄生式继承
 * 7.class继承
*/
var log = console.log;

var doSomething = function(){};
testFunc.prototype.foo='bar';
log( testFunc.prototype );

var testObj = new testFunc();
testObj.foo='zoo';
log(testObj);
log(testObj.foo);

// 定义一个动物类
function Animal(name) {
	// 属性
	this.name = name || 'Animal';
	// 实例方法
	this.sleep = function () {
		console.log(this.name + '正在睡觉！');
	}
}
// 原型方法
Animal.prototype.eat = function (food) {
	console.log(this.name + '正在吃：' + food);
};