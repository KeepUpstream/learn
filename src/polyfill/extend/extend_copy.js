/**
 * 拷贝继承
 * 特点：支持多继承
 * 缺点：
 * （1）效率低，占用内存（要拷贝父类属性）
 * （2）无法获取父类不可枚举的方法
*/
function Cat(name){
	var animal = new Animal();
  　// 遍历拷贝属性
	for(var p in animal){
	  Cat.prototype[p] = animal[p];
	}
	Cat.prototype.name = name || 'Tom';
  }
  
  // Test Code
  var cat = new Cat();
  console.log(cat.name);
  console.log(cat.sleep());
  console.log(cat instanceof Animal); // false
  console.log(cat instanceof Cat); // true