
// 创建一个实例
var person = {
  firstName: "John",
  lastName : "Doe",
  id     : 5566,
  fullName : function() {
    return this.id+" : "+this.firstName + " " + this.lastName;
  }
};

//测试call方法
var person1 = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
var person2 = {
  firstName:"John",
  lastName: "Doe",
}

//****************************测试实例
//理论1：this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象
console.error("eg1:");
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();			
window.a();

console.error("eg2:");
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();	
window.o.fn();	//这里的this为什么不是指向window，如果按照上面的理论1，最终this指向的是调用它的对象,接着再看

console.error("eg3:");
var o = {
		d:120,
    a:10,
    b:{
        //d:123
        a:12,
        fn:function(){
            console.log(this.a+","+this.d); //12
        }
    }
}
o.b.fn();//这里同样也是对象o点出来的，但是同样this并没有执行它

console.error("eg4:");
var obj = {
    temp:10,
    act:{
        temp:12,
        fn:function(){
            console.log(this.temp); //undefined
            console.log(this); //window
        }
    }
}
var j = obj.act.fn;
j();
//由window对象调用执行，window不存在属性temp，所以为undefined

console.error("eg5:");
function Person(name,age){
		this.user = name;
		this.age = age;
}
var per1 = new Person("aihui",24);
console.log(per1.age);//a可以点出函数Fn里面的user，是因为new关键字可以改变this的指向，将这个this指向对象a

//情况1：如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，但在js严格版中this指向的不是window，而是undefined
//情况2：如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象；若这个函数包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象
//情况3：因为用了new关键字就是创建一个对象实例
//情况4：当this碰到return时，如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。

function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined

function fn2()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn2;  
console.log(a.user); //undefined

function fn3()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn3;  
console.log(a.user); //追梦子

function fn4()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new fn4;  
console.log(a.user); //追梦子
