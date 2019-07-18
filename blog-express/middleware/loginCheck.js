/*
 * @Author lizhenhua
 * @version 2019/7/16
 * @description 
 */
const {ErrModel} = require("../model/resModel")

module.exports = (req, res, next)=>{
    if(req.session&&req.session.sessionId){
        next()
        return
    }
    res.json(new ErrModel('未登录',401))
}


 