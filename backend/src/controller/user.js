/**
 * Created by lizhenhua on 2019/4/6.
 */
const {exec} = require("../db/mysql")//引入执行函数

module.exports = {
    login(username,password){
       let sql=`select username, realname from users where username='${username}' and password='${password}'`
       return exec(sql).then(rows=>{
           return rows[0] || {}
       })
    },
    newUser(userData={}){
        const {username,password,realname} = userData;
        let sql = `
            insert into users (username,password,realname)
            values ('${username}','${password}','${realname}')
        `
        return exec(sql).then(({insertId})=>{
            return {
                id:insertId
            }
        })
    }
}