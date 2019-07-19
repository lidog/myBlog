/*
 * @Author lizhenhua
 * @version 2019/7/18
 * @description 
 */
const PENDING=0
const FULFILLED = 1
const REJECTED = 2


class Promise{
    //fn 其实是  (resolve,reject)=>{}
    constructor(fn){
        //内部维护的状态机,FULFILLED,REJECTED,PENDING 对应完成，错误，等待
        this._state = PENDING
        this._data = undefined //保存reject 的原因

        this._onFulfilledCallbacks = [] //保存then回调函数
        this._onRejectedCallbacks = []  // catch 状态回调

        try{
            fn(
                data => resolve(this,data),//这个data是你执行异步请求时的结果
                reason => reject(this,reason)
            )
        }catch (e) {
            reject(this,e)
        }
    }

    /**
    * 功能：then 接受两个函数，一个成功回调，一个失败回调，最后返回一个新的promise
     * 实现：通过setimeout 延后处理FULFILLED和REJECTED两个状态
     *      在PENDING状态，即new Promise的时候处理好所有then 和 catch 回调，放到两个队列中
     *      this._onFulfilledCallbacks = [] //保存then回调函数
     *      this._onRejectedCallbacks = []  // catch 状态回调
     *
    */
    // 每个then方法都返回一个新的Promise对象（原理的核心）
    // 如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
    // 如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回。
    // 如果then方法中没有return语句，就视为返回一个用Undefined包装的Promise对象
    // 若then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
    // 如果then方法没有传入任何回调，则继续向下传递（值的传递特性）。

    then(onFulfilled,onRejected){
        //处理 .then().then(()=>{}) 参数为空的情况，直接把参数传给下一个then就好
        if(typeof onFulfilled!=='function'){
            onFulfilled = function (data) {
                return data
            }
        }
        if(typeof onRejected!=='function'){
            onRejected = function (reason) {
                //这里不能用return reason，后面then中的try catch无法捕获错误
                throw reason
            }
        }
        let promise2 //新promise
        if(this._state===FULFILLED){
           setTimeout(()=>{
               //如果父promise 是 完成状态，需要返回一个新的promise
               promise2 = new Promise((resolve,reject)=>{
                   try {
                       //onFulfilled 是当前then 的成功回调，所以它的返回值x
                       // 会返回给下一个then
                       const x = onFulfilled(this._data)
                       resolvePromise(promise2,x,resolve,reject)
                   }catch (e) {
                       //捕获上面then的错误，放在reject中往下传
                       reject(e)
                   }
               })
           })
        }else if(this._state=== REJECTED){
            setTimeout(()=>{
                //如果父promise 是 错误状态，也需要返回一个新的promise
                promise2 = new Promise((resolve,reject)=>{
                    try {
                        //onRejected 是当前then 的错误时的回调
                        const x = onRejected(this._data)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch (e) {
                        //捕获上面then的错误，放在reject中往下传
                        reject(e)
                    }
                })
            })
        }else if(this._state === PENDING){ //等待状态
            //等待状态也需要返回一个promise
            promise2 = new Promise((resolve,reject)=>{
                //把所有的成功回调都放到_onFulfilledCallbacks队列
                this._onFulfilledCallbacks.push(data=>{
                    try {
                        const x = onFulfilled(data)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch (e) {
                        reject(e)
                    }
                })
                //把所有的错误回调都放到_onRejectedCallbacks队列
                this._onRejectedCallbacks.push(reason=>{
                    try {
                        const x = onRejected(reason)
                        if(x instanceof Promise){
                            return x.then(resolve,reject)
                        }else{
                            resolve(x)
                        }
                    }catch (e) {
                        reject(e)
                    }
                })
            })
        }

    }

    //catch 其实就是返回一个新的错误状态的promise，所以可以基于then实现
    catch(onRejected){
        return this.then(undefined,onRejected)
    }
}

/**
* 功能：new Promise 时执行了异步，异步结束后执行 resolve(),
 * resolve 其实作用其实就是执行通过setimeout阶段收集的
 * 在this._onFulfilledCallbacks中的所有then的成功回调函数，
*/
function resolve(promise,data) {
    //处理resolve 的值是promise 的情况
    if(data instanceof Promise){
        return data.then(
            d =>{resolve(promise,d)},
            r =>{reject(promise,r)}
        )
    }
    //如果父函数正在执行状态不用干啥
    if(promise._state!==PENDING){
        return
    }
    //否则就是最后调用，去循环成功会标，改变promise 状态
    setTimeout(()=>{
        promise._state = FULFILLED //改变state 的状态
        promise._data = data
        //循环所有的then回调
        for(let callback of promise._onFulfilledCallbacks){
            callback(data)
        }
    })
}

/**
 * 功能：new Promise 时执行了异步，异步结束后执行 reject(),
 * reject 其实作用其实就是执行通过setimeout阶段收集的
 * 在this._onRejectedCallbacks中的所有catch的失败回调函数，
 */
function reject(promise,reason) {
    if(promise._state!==PENDING){ //如果父函数正在执行状态不用干啥
        return
    }
    setTimeout(()=>{
        promise._state = REJECTED //改变state 的状态
        promise._data = reason
        //循环所有的catch回调
        for(let callback of promise._onRejectedCallbacks){
            callback(reason)
        }
    })
}

//处理resolve状态的then调用，确保返回真实的结果
function resolvePromise(promise,x,resolve,reject){
    //如果返回值也是promise实例，直接返回这个实例的then作为结果
    if(x instanceof Promise){
        return x.then(resolve,reject)
    }else{
        resolve(x)
    }
}

module.exports = Promise

 