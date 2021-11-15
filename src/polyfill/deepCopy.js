// 测试的obj对象
const obj = {
    // =========== 1.基础数据类型 ===========
    num: 0, 			// number
    str: '', 			// string
    bool: true, 		// boolean
    unf: undefined, 	// undefined
    nul: null, 			// null
    sym: Symbol('sym'), // symbol
    bign: BigInt(1n), // bigint

    // =========== 2.Object类型 ===========
    // 普通对象
    obj: {
        name: '我是一个对象',
        id: 1
    },
    // 数组
    arr: [0, 1, 2],
    // 函数
    func: function () {
        console.log('我是一个函数')
    },
    // 日期
    date: new Date(0),
    // 正则
    reg: new RegExp('/我是一个正则/ig'),
    // Map
    map: new Map().set('mapKey', 1),
    // Set
    set: new Set().add('set'),
    // =========== 3.其他 ===========
    [Symbol('1')]: 1  // Symbol作为key
};
// 4.添加不可枚举属性
Object.defineProperty(obj, 'enumerable', {
    enumerable: false,
    value: '不可枚举属性'
});
// 5.设置原型对象
Object.setPrototypeOf(obj, {
    proto: 'proto'
})
// 6.设置loop成循环引用的属性
obj.loop = obj

//方式一：字符串解析
function deepCloneByJSON(target) {
    if (typeof target === 'object' && target !== null) {
        return JSON.parse(JSON.stringify(target));
    } else {
        return target;
    }
}

//方式二：遍历+递归
//封装深拷贝函数
function deepCopy(newObj, oldObj) {
	for (k in oldObj) {
		let item = oldObj[k];
		if (item instanceof Array) {
			newObj[k] = [];
			deepCopy(newObj[k], item)
		} else if (item instanceof Object) {
			newObj[k] = {};
			deepCopy(newObj[k], item)
		} else {
			newObj[k] = item;
		}
	}
}
//换种写法
function deepCopy2(arr){
    var obj=arr.constructor==Array?[]:{};
　　//第二种方法 var obj=arr instanceof Array?[]:{}
　　//第三种方法 var obj=Array.isArray(arr)?[]:{}
　　for(var item in arr){
        if(typeof arr[item]==="object"){
            obj[item]=deepClone(arr[item]);
        }else{
            obj[item]=arr[item];
        }
    }
    return obj;
}

//优化版：
function deepClone(target) {
    // WeakMap作为记录对象Hash表（用于防止循环引用）
    const map = new WeakMap();
    // 判断是否为object类型的辅助函数，减少重复代码
    function isObject(target) {
        return (typeof target === 'object' && target ) || typeof target === 'function'
    }

    function clone(data) {
        // 基础类型直接返回值
        if (!isObject(data)) {
            return data
        }
        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }
        // 处理函数对象
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }
        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
            return exist
        }
        // 处理Map对象
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }
        // 处理Set对象
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }

        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = Object.create(Object.getPrototypeOf(data), allDesc)

        // 新对象加入到map中，进行记录
        map.set(data, result)

        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}

// 测试
// deepCloneByJSON测试obj存在BigInt类型、循环引用，JSON.stringfy()执行会报错，所以除去这两个条件进行测试
//const clonedObj = deepCloneByJSON(obj)
//console.log(clonedObj === obj,clonedObj.arr === obj.arr )  //false false
//const copyedObj = deepCopy(obj)
//console.log(copyedObj === obj,copyedObj.arr === obj.arr )  //false false

const dpclonedObj = deepClone(obj)
console.log(dpclonedObj === obj,dpclonedObj.arr === obj.arr,dpclonedObj.func === obj.func ) 
console.log(dpclonedObj)
console.log(dpclonedObj.proto) // proto，可以取到原型的属性


