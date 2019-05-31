/*
 * @Author lizhenhua
 * @version 2019/5/30
 * @description 
 */

const redis = require('mysql');
const {REDIS_CONF} = require("../conf/db") //引入连接数据库配置

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err=>{
    console.error(err)
})

//
function  set(key,val){
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

function get(key) {
    return new Promise((resolve,reject)=>{
         redisClient.get(key,(err,val)=>{
             if(err){
                 reject(err)
                 return
             }
             if(!val){
                 resolve(val)
                 return
             }
             try{
                 resolve(JSON.parse(val))
             } catch (e) {
                 resolve(val)
             }
         })
    })
}

module.exports = {
    set,
    get,
}