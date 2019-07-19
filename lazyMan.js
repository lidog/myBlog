/*
 * @Author lizhenhua
 * @version 2019/7/18
 * @description 
 */

/**
 实现一个LazyMan，可以按照以下方式调用:
 LazyMan("Hank")输出:
 Hi! This is Hank!
  
 LazyMan("Hank").sleep(10).eat("dinner")输出
 Hi! This is Hank!
 //等待10秒..
 Wake up after 10
 Eat dinner~
  
 LazyMan("Hank").eat("dinner").eat("supper")输出
 Hi This is Hank!
 Eat dinner~
 Eat supper~
  
 LazyMan("Hank").sleepFirst(5).eat("supper")输出
 //等待5秒
 Wake up after 5
 Hi This is Hank!
 Eat supper
  
 以此类推。

*/
class LazyManClass {
    constructor(name){
        this.name = name
        this.obj = {
            sleepOrEat:[],
            sleepFirstArr:[],
            sayHiArr:[],
        }
        this.timer = null
        this.sayHi()
    }
    run(){
        clearTimeout(this.timer)
        this.timer = setTimeout(async ()=>{
            let list = [];
            list = list.concat(this.obj.sleepFirstArr).concat(this.obj.sayHiArr).concat(this.obj.sleepOrEat);
            while (list.length>0){
                await list.shift()()
            }
        },0)
    }
    sayHi(){
        this.obj.sayHiArr.push(()=>{
            console.log("Hi! This is "+this.name+"!")
        })
        this.run()
        return this
    }
    sleep(time){
        this.obj.sleepOrEat.push(()=>{
            return new Promise(resolve=>{
                setTimeout(()=>{
                    console.log("Wake up after " + time)
                    resolve();
                },time*1000)
            })
        })
        return this
    }
    eat(str){
        this.obj.sleepOrEat.push(()=>{
            console.log('Eat '+str)
        })
        return this
    }
    sleepFirst(time){
        this.obj.sleepFirstArr.push(()=>{
            return new Promise(resolve=>{
                setTimeout(()=>{
                    console.log("sleepFirst " + time)
                    resolve();
                },time*1000)
            })
        })
        return this
    }
}
function LazyMan(name) {
    return new LazyManClass(name)
}
/**
* 需要解决几个问题：
 * 链式调用怎么实现？
 * 调用顺序问题怎么实现？
 * firstSleep 比说出名字更加早执行怎么办
 * 什么时候开始真实的执行？
 * 等待怎么实现？
*/

/**
* 链式调用怎么实现？
 *  把 eat，sleep，firstSleep 都注册在原型上，每次 retrun this
*/

/**
 * 调用顺序问题怎么实现？
 *  在实例属性上 声明几个数组，分别保存 eat，sleep，firstSleep 的执行队列
 *  按照优先级最后拼装成真实的可执行队列
 */

/**
 * firstSleep 比说出名字更加早执行怎么办
 * 说明说出名字也是一个原型方法，只是它在new 实例的时候就执行了，属于隐式调用的原型方法
 */

/**
 * 什么时候开始真实的执行？
 * 利用 settimeout 会放在异步队列中的特性，会到链式调用全部执行完后才执行,这个保证了能收集到所有的执行函数
 * 因为sayHi 是默认的，所以只需要在 sayHi 的时候开始 run 就行了
 */

/**
 * 等待怎么实现？
 * 目前使用了promise + await
 */