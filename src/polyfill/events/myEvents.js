// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
/*
const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', ()=>console.log('I want sleep));
event.fire('sleep');
*/
class Events {
	constructor() {
    	this._events = {};
    }
  	on(name, fn, ...args) {
   		if(name in this._events[name]){
          this._events[name].push(fn);
        }else{
          this._evnets[name]=[fn];
        }
    }
	fire(name, ...args) {
		var self = this;
		   if(name in this._events && this._events[name].length>0){
		  this._events[name].forEach(callback =>{
			  callback.apply(self,args);
		  }); 
		}else{
		  return false;
		}
	}
    off(name, fn) {
		if(typeof name !== "string" || typeof fn !== "function"){
			throw new Error("`${name} must be event name, ${fn} must be function name`");
		}
    	if(name in this._events){
        	this._events[name].filter(function(callback,i,eventsArr){
            	return callback !== fn;
            });
        }else{
          return false;
        }
    }
	clear(name){
		if(typeof name !== "string") throw new Error("`${name} must be a string`");
		if(name in this._events){
			this._events[name]=[];
		}
	}
  	once(name, fn, ...args) {
		function wrap(fn,args){
			fn.apply(fn,args);
			this.off(name,fn);
		}
		if(name in this._events){
			this._events[name].push(wrap(fn,args));
		}else{
			this._events[name]=[wrap(fn,args)];
		}
    }
}

/**
 * 实现chainAsync，函数挨个执行，前一个执行完毕调用next调用后一个函数，一直调用到最后一个函数
 * 类似express 中间件的实现
 * 0s 输出：0 seconds
 * 3s 输出：3 seconds
 * 5s 输出：5 seconds
 */
chainAsync([
    next => {
        console.log('0 seconds');
        setTimeout(() => next(), 3000);
    },
    next => {
        console.log('3 second');
        setTimeout(() => next(), 2000);
    },
    () => {
        console.log('5 second');
    }
]);

function chainAsync(originEvents) {
  
}



