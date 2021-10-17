
(function(){

    // 新建一个 Class 的类，new Type 也是一个函数
var Class = this.Class = new Type('Class', function(params){
    // 如果传入的 参数是方法，就把该函数当作初始化的方法
    if (instanceOf(params, Function)) params = {initialize: params};

    var newClass = function(){
        // 解除属性里对其他对象的引用
        reset(this);
        // 如果当前类正在构建，就返回当前类，不做任何操作
        if (newClass.$prototyping) return this;
        // $caller 和 $family 是什么啊
        this.$caller = null;
        this.$family = null;
        // 有初始化函数的话，就传入参数到该初始化函数，没有就返回自身
        var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
        // 这句又是什么意思，一个 $caller ，一个 caller
        this.$caller = this.caller = null;
        return value;
        // extend(this) 把类的方法，都添加到当前新建的类中
        // implement(params) 把 params 的所有方法都添加到当前类中
    }.extend(this).implement(params);

    //指定 constructor ，以便使用 instanceOf 来验证
    newClass.$constructor = Class;
    newClass.prototype.$constructor = newClass;
    // 指定当前类的父类是哪一个
    newClass.prototype.parent = parent;

    return newClass;
});

/*
    在子类拥有和父类同名方法时，使用 this.parent(args) 方法来调用父类的该方法
 */
var parent = function(){
    // :: 如果当前方法没有被调用，那么就说，parent 方法没有被调用
    if (!this.$caller) throw new Error('The method "parent" cannot be called.');
    // 当前函数被调用的名字 function person(age) { this.age = age }，则 age 被调用的就是 person 函数，就是得到 person 这个名字
    var name = this.$caller.$name,
        // $owner 当前类对象, 得到当前类对象的父类对象
        parent = this.$caller.$owner.parent,
        // 得到父类相同名字的方法
        previous = (parent) ? parent.prototype[name] : null;
    if (!previous) throw new Error('The method "' + name + '" has no parent.');
    // 父类的该同名函数，添加到当前子类中
    return previous.apply(this, arguments);
};

// 解除属性里对其他对象的引用
// 这个解除的例子，可以看 http://hmking.blog.51cto.com/3135992/675856
var reset = function(object){
    for (var key in object){
        var value = object[key];
        switch (typeOf(value)){
            case 'object':
                var F = function(){};
                F.prototype = value;
                object[key] = reset(new F);
                break;
            case 'array': object[key] = value.clone(); break;
        }
    }
    return object;
};

var wrap = function(self, key, method){
    if (method.$origin) method = method.$origin;
    var wrapper = function(){
        // 如果方法是是被保护的，或者这个方法没有 caller ，就不能被调用
        if (method.$protected && this.$caller == null) throw new Error('The method "' + key + '" cannot be called.');
        var caller = this.caller, current = this.$caller;
        this.caller = current; this.$caller = wrapper;
        // 将 method 绑定到当前对象中
        var result = method.apply(this, arguments);
        this.$caller = current; this.caller = caller;
        return result;
        // 通过extend ,把当前函数的属性附加到 self 里去
    }.extend({$owner: self, $origin: method, $name: key});
    return wrapper;
};

var implement = function(key, value, retain){
    //  Mutators 的 key 只有 Extends 和 Implements
    if (Class.Mutators.hasOwnProperty(key)){
        value = Class.Mutators[key].call(this, value);
        if (value == null) return this;
    }

    if (typeOf(value) == 'function'){
        // 隐藏的方法子类就不要再继承使用了
        // $hidden 和 $protected 去看函数那章
        if (value.$hidden) return this;
        this.prototype[key] = (retain) ? value : wrap(this, key, value);
    } else {
        // merge 应该是同名的函数，这样就直接添加进去就好
        Object.merge(this.prototype, key, value);
    }

    return this;
};

// 为了将父类的的属性继承到子类，会使用中间变量，将父类传递给中间变量，再通过中间变量传递给子类
var getInstance = function(klass){
    // 谁知当前当前类正在构建
    klass.$prototyping = true;

    var proto = new klass;
    // 这里就删除 $prototyping ,也就是构建的过程就是上面这一行咯
    delete klass.$prototyping;
    return proto;
};

// 这里有 overloadSetter ，所以，可能是 Class.implement 方法，来给类额外添加函数的
Class.implement('implement', implement.overloadSetter());

Class.Mutators = {

    // 传给 extends 的参数是 parent
    Extends: function(parent){
        // 指向当前类的父类是 parent 参数
        this.parent = parent;
        // 使用 getInstance 得到父类的全部方法
        this.prototype = getInstance(parent);
    },

    Implements: function(items){
        Array.convert(items).each(function(item){
            var instance = new item;
            for (var key in instance) implement.call(this, key, instance[key], true);
        }, this);
    }
};

})();
/*
 Extends 其实是分两部分，使用 Extends 的时候，是把父类的所有属性和方法，通过 getInstance 来附加到当前类中
 然后当前类的方法中，可以使用 this.parent(args) 方法，来把父类的同名方法加载进来

 Implements 方法中没有指代 this.parent = parent ，所以如果当前类写了和父类同名的方法，就会覆盖父类的方法
 Implements 只是给当前类添加更多的方法
 */