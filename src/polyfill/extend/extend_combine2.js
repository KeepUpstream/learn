/**
 * 寄生组合继承
 * 核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
 * 
*/
function Cat(name){
	Animal.call(this);
	this.name = name || 'Tom';
  }
  (function(){
	// 创建一个没有实例方法的类
	var Super = function(){};
	Super.prototype = Animal.prototype;
	//将实例作为子类的原型
	Cat.prototype = new Super();
  })();
  
  // Test Code
  var cat = new Cat();
  console.log(cat.name);
  console.log(cat.sleep());
  console.log(cat instanceof Animal); // true
  console.log(cat instanceof Cat); //true
  
  Cat.prototype.constructor = Cat; // 需要修复下构造函数
  
  //or
  function Cat(name){
	Animal.call(this);
	this.name = name || 'Tom';
  }
   
  Cat.prototype = Object.create(Animal.prototype, {
	constructor: {
	  value: Cat,
	  enumerable: false,
	  writable: true,
	  configurable: true
	}
  })
   
  // Test Code
  var cat = new Cat();
  console.log(cat.name);
  console.log(cat.sleep());
  console.log(cat instanceof Animal); // true
  console.log(cat instanceof Cat); //true<br>以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。
  
