/**
 * 组合继承
 * 核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
 * 特点：
 * （1）弥补了构造继承的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
 * （2）既是子类的实例，也是父类的实例
 * （3）不存在引用属性共享问题
 * （4）可传参
 * （5）函数可复用
 * 缺点：
 * 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）
 * 
 * 
*/
function Cat(name){
	Animal.call(this);
	this.name = name || 'Tom';
  }
  Cat.prototype = new Animal();
  
  //修复构造函数指向
  Cat.prototype.constructor = Cat;
  
  
  // Test Code
  var cat = new Cat();
  console.log(cat.name);
  console.log(cat.sleep());
  console.log(cat instanceof Animal); // true
  console.log(cat instanceof Cat); // true