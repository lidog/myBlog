/*
 * @Author lizhenhua
 * @version 2019/7/18
 * @description 
 */
const PENDING=0
const FULFILLED = 1
const REJECTED = 2


class Promise{
    constructor(fn){
        //内部维护的状态机,FULFILLED,REJECTED,PENDING 对应完成，错误，等待
        this._state = PENDING
        this._data = undefined //保存reject 的原因

        this._onFulfilledCallbacks = [] //保存then回调函数
        this._onRejectedCallbacks = []  // catch 状态回调

        try {
            resolve(this,data)
        }catch (e) {
            reject(this,e)
        }
    }

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
        let promise2
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
        }else if(this._state === PENDING){
            //完成状态也需要返回一个promise
            promise2 = new Promise((resolve,reject)=>{
                this._onFulfilledCallbacks.push(data=>{
                    try {
                        const x = onFulfilled(data)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch (e) {
                        reject(e)
                    }
                })
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

function resolve(promise,data) {
    if(promise._state!==PENDING){ //如果父函数正在执行状态
        return
    }
    setTimeout(()=>{
        promise._state = FULFILLED //改变state 的状态
        promise._data = data
        //循环所有的then回调
        for(let callback of promise._onFulfilledCallbacks){
            callback(data)
        }
    })
}

function reject(promise,reason) {
    if(promise._state!==PENDING){ //如果父函数正在执行状态
        return
    }
    setTimeout(()=>{
        promise._state = REJECTED //改变state 的状态
        promise._data = reason
        //循环所有的catch回调
        for(let callback of promise._onRejectedCallbacks){
            callback(data)
        }
    })
}

//处理resolve状态的then调用
function resolvePromise(promise,x,resolve,reject){
    //如果返回值也是promise实例，直接返回这个实例的then作为结果
    if(x instanceof Promise){
        return x.then(resolve,reject)
    }else{
        resolve(x)
    }
}

module.exports = Promise

 