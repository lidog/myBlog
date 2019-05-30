/**
 * Created by lizhenhua on 2019/4/6.
 */

const {login,newUser} = require("../controller/user")
const {SucModel, ErrModel} = require("../model/resModel")
const {userApi} = require("../conf/api")


const handleUserRouter = (req,res)=>{
    const method = req.method;
    const path = req.url.split("?")[0];

    //登陆
    if(method=='GET'&&path==userApi.login){
        const {username,password} = req.query;
        return login(username,password).then(({userId})=>{
            if(userId){
                return new SucModel('登陆成功')
            }else {
                return new ErrModel('登陆失败')
            }
        })
    }


    //注册
    if(method=='POST'&&path==userApi.register){
        return newUser(req.body).then(({userId})=>{
            if(userId){
                return new SucModel(userId)
            }else {
                return new ErrModel('注册失败')
            }
        })
    }

}

module.exports = handleUserRouter