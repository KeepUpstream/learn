/**
 * 构造函数继承
 * 核心：使用父类的构造函数在增强子类实例，等于是复制父类的属性给子类实例（没用到原型）
 * 特点：

解决了原型链继承中，子类实例共享父类引用属性的问题
创建子类实例时，可以向父类传递参数
可以实现多继承（call多个父类对象）
缺点：
子类实例只是子类的实例，并不是父类的实例
只能继承父类的实例属性和方法，不能继承原型属性/方法
无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
*/
function Cat(name){
    Animal.call(this);
    this.name= name || 'Tom';
} 

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal);   //false
console.log(cat instanceof Cat); // true

