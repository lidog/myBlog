/**
 * Created by lizhenhua on 2019/4/6.
 */
const mysql = require('mysql')
const {MYSQL_CONF} = require("../conf/db") //引入连接数据库配置

//创建连接对象
const  con = mysql.createConnection(MYSQL_CONF)

//开始连接数据库
con.connect()

module.exports = {
    exec(sql){
        return new Promise((resolve,reject)=>{
            con.query(sql,(err,res)=>{
                if(err){
                    reject(err)
                    return
                }
                resolve(res)
            })
        })
    }
}