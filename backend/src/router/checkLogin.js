/*
 * @Author lizhenhua
 * @version 2019/5/30
 * @description 
 */

const {getUserInfo} = require("../controller/user")
const {SucModel, ErrModel} = require("../model/resModel")

module.exports = checkLogin = (req) => {
    //判断是否存在用户     session方案解析
    return getUserInfo(req.cookie.userId).then(res => {
        if (res.id) {
            return new SucModel(res.id)
        } else {
            return new ErrModel("未登录", 303)
        }
    })
}
 