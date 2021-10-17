/**
 * 实例继承
 * 核心：为父类实例添加新特性，作为子类实例返回
 * 特点：不限调用方式，不管是 子类() 还是 new 子类()都能得到同样的效果
 * 缺点：
 * （1）实例是子类实例，不是父类实例；
 * （2）不支持多继承。
 * 
*/

function Cat(){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false