/**
 * class继承
 * 核心：
 * 使用 extends 表明继承自哪个父类，并且在子类构造函数中必须调用 super，
 * 这段代码可以看成 Animal.call(this, name)。Class 的本质就是函数
*/
class Cat extends Animal {
    constructor(name){
		super(name);
		this.name= name || 'Animal';
    }
}

var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true