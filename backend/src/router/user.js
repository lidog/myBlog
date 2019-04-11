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
    if(method=='POST'&&path==userApi.login){
        const {username,password} = req.body;
        return login(username,password).then(({username})=>{
            if(username){
                return new SucModel('登陆成功')
            }else {
                return new ErrModel('登陆失败')
            }
        })
    }

    //注册
    if(method=='POST'&&path==userApi.register){
        return newUser(req.body).then(({id})=>{
            if(id){
                return new SucModel('注册成功')
            }else {
                return new ErrModel('注册失败')
            }
        })
    }


}

module.exports = handleUserRouter