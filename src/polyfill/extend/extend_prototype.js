/**
 * 原型链继承
 * 核心：将父类的实例作为子类的原型
 * 特点：
 * （1）纯粹的继承关系，实例是子类的实例，也是父类的实例
 * （2）父类新增原型上的方法|属性，子类都能访问到
 * 缺点：
 * （1）可以在Cat构造函数中为实例增加实例属性；如果要新增原型属性和方法，则必须放在new Animal()之后；
 * （2）无法实现多继承
 * （3）来自原型对象的所有属性被所有实例共享
 * （4）创建子类实例时，无法向父类构造函数传参
*/

function Cat() {
}
cat.prototype = new Animal()
cat.prototype.name = "cat" //修改的到底是实例还是原型的属性？再次(new Anmial()),name

var cat = new Cat();
console.log(cat.name)
console.log(cat.eat('fish'))
console.log(cat.sleep())
console.log(cat instanceof Animal)  // true
console.log(cat instanceof Cat) // true

