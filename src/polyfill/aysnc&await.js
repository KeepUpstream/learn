/**async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
 * async函数会返回一个promise，并且Promise对象的状态值是resolved（成功的）
 *      如果async函数中没有return，那么Promise对象的值是undefined
 *      如果async函数中显式return，那么Promise的resolve的值就是你return的值
 * await 必须放在async函数中使用，await会阻塞后面的代码，先执行async外面的同步代码；然后回到async内部等待表达式的值：
 *      不是Promise对象，将该值作为await表达式的结果；
 *      是Promise对象，等待Promise对象fulfilled，然后他resolve参数作为await表达式的运算结果（如果没有resolve(),await失败，后面代码不执行）。
 *      
 * async function fn(args){
 *      let res = await fn2();
 * }
 * 等同于
 * function fn(args){
 *      return spawn(function*(){// spawn 函数就是自动执行器
 *      ...
 *      });
 * }
 * 下面给出 spawn 函数的实现，基本就是前文自动执行器的翻版
 * function spawn(genF){
 *      return new Promise(function(resolve,reject){
 *          var gen = genF();
 *          function step(nextF){
 *              try{
 *                  var next = nextF();
 *              }catch(e){
 *                  return reject(e);
 *              }
 *              if(next.done){
 *                  return resolve(next.value);             
 *              }
 *              Prominse.resolve(next.value).then(function(v){
 *                  step(function(){return gen.next(v);});
 *              },function(e){
 *                  step(function(){return gen.throw(e);});
 *              });
 *          }
 *          step(function(){return gen.next(undefined);});
 *      });
 * }
 * async 函数是非常新的语法功能，新到都不属于 ES6，而是属于 ES7。目前，它仍处于提案阶段，但是转码器 Babel 和 regenerator 都已经支持，转码后就能使用。
 */
function fn() {
    return new Promise(resolve => {
        console.log(1);
        //resolve();
    })
};
async function f1() {
    await fn(); 
    console.log(2)
};
f1();
console.log(3);
//输出1 3 

function getSomething() {
    console.log("getSomething execute");
    return "something";
}
async function testAsync() {
    console.log("testAsync execute");
    return Promise.resolve("hello async");
}
async function test() {
    const v1 = await getSomething();
    console.log("1111")
    const v2 = await testAsync();
    console.log(v1, v2);
}
test();

//使用async await实现掷骰子
function throwDice(guess){
    return new Promise((resolve,reject)=>{
        var sino = parseInt(Math.random()*6+1);
        if(guess == "big" && sino>3 || guess=="small" && sino<=3){
            console.log("you're right");
            resolve(sino);
        }else{
            console.log("you're wrong");
            reject(sino);
        }
    });
}
async function test2(){
    try{
        let result = await Promise.all([throwDice('big'),throwDice('big')]);
        console.log(result);
    }catch(error){
        console.log(error);
    }
}
test2();
