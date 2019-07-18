/**
 * Created by lizhenhua on 2019/4/6.
 */
const {exec} = require("../db/mysql")//引入执行函数
const {set,get} = require("../db/redis")
module.exports = {
    login(username,password){
       let sql=`select * from users where username='${username}' and password='${password}'`
       return exec(sql).then(rows=>{
           return rows[0] || {}
       })
    },
    getUserInfo(userId){
        let sql=`select * from users where userId='${userId}'`
        return exec(sql).then(rows=>{
            return rows[0] || {}
        })
        // return get(userId).then(res=>{
        //     return res?1:0
        // })
    },
    newUser(userData={}){
        const {username,password,realname} = userData;
        return exec(`select * from users where username='${username}'`).then(res=>{
            if(res.length>0){
                return Promise.resolve({session:false})
            }else {
                let userId =  Date.now() + "_" + Math.random();
                // set("userId",userId)
                let sql = `
                    insert into users (username,password,realname,userId)
                    values ('${username}','${password}','${realname}','${userId}')
                `
                return exec(sql).then(({insertId})=>{
                    if(insertId){
                        return {
                            userId:userId
                        }
                    }
                })
            }
        })
    }
}