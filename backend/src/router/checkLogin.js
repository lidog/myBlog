/*
 * @Author lizhenhua
 * @version 2019/5/30
 * @description 
 */

const {getUserInfo} = require("../controller/user")
const {SucModel, ErrModel} = require("../model/resModel")

module.exports = checkLogin = async (req)=>{
    //判断是否存在用户     session方案解析
    let id = -1
    if(req.cookie.userId){
         await getUserInfo(req.cookie.userId).then(res=>{
            if(res.id){
                id = res.id
            }
        })
    }
    if(id===-1){
        return new ErrModel("未登录",303)
    }else {
        return new SucModel(id)
    }
}
 