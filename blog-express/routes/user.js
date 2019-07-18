var express = require('express');
var router = express.Router();
const {login,newUser} = require("../controller/user")
const {SucModel, ErrModel} = require("../model/resModel")
const {userApi} = require("../conf/api")

/* GET home page. */
router.post(userApi.login,function (req, res, next) {
    const {username,password} = req.body;
    login(username,password).then(({userId})=>{
        if(userId){
            req.session.sessionId = userId;//把sessionId 存进redis
            res.json(new SucModel("登录成功"))
        }else {
            res.json(ErrModel('登陆失败'))
        }
    })
})

router.get(userApi.loginOut,(req,res,next)=>{
    req.session.sessionId = undefined;
    res.json(new SucModel("登出成功"))
})

router.post(userApi.register,function (req, res, next) {
    newUser(req.body).then(({userId})=>{
        if(userId){
            res.json(new SucModel(userId))
        }else {
            res.json(new ErrModel('注册失败'))
        }
    })
})


module.exports = router;
