var express = require('express');
var router = express.Router();
const {getList,getDetail,newBlog,updateBlog,delBlog}  = require("../controller/blog");
const {SucModel, ErrModel} = require("../model/resModel")
const {blogApi} = require("../conf/api")
const loginCheck = require("../middleware/loginCheck")


/* GET home page. */
router.get(blogApi.list,loginCheck,function(req, res, next) {
    const author = req.query.author || ""
    const keyword = req.query.keyword || ""
    getList(author,keyword).then(listData=>{
        res.json(new SucModel(listData))
    })
});

router.get(blogApi.detail,loginCheck, function(req, res, next) {
    const id = req.query.id ||"";
    getDetail(id).then(data=>{
        res.json(new SucModel(data))
    })
});

router.get(blogApi.del,loginCheck, function(req, res, next) {
    delBlog(req.query.id,'lzh').then(data=>{
        if(data){
            res.json(new SucModel('删除成功'))
        }else {
            res.json(new ErrModel('删除失败'))
        }
    })
});

router.post(blogApi.new,loginCheck,function (req, res, next) {
    newBlog(req.body).then(data=>{
        res.json(new SucModel(data))
    })
})

router.post(blogApi.update,loginCheck,function (req, res, next) {
    updateBlog(req.body).then(data=>{
        if(data){
            res.json(new SucModel('更新成功'))
        }else {
            res.json(new ErrModel('更新失败'))
        }
    })
})


module.exports = router;
