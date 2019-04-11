/**
 * Created by lizhenhua on 2019/4/6.
 */
const env = process.env.NODE_ENV

let MYSQL_CONF

if(env === "dev"){
    MYSQL_CONF = {
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"12345lzH",
        database:"myblog"
    }
}
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