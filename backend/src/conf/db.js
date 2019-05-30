/**
 * Created by lizhenhua on 2019/4/6.
 */
const env = process.env.NODE_ENV

let MYSQL_CONF
//开发环境配置数据库
if(env === "dev"){
    MYSQL_CONF = {
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"12345lzH",
        database:"myblog"
    }
}
//线上环境配置数据库
if(env === "production"){
    MYSQL_CONF = {
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"12345lzH",
        database:"myblog"
    }
}

module.exports = {
    MYSQL_CONF
}