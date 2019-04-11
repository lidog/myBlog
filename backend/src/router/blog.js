/**
 * Created by lizhenhua on 2019/4/6.
 */

const {getList,getDetail,newBlog,updateBlog,delBlog}  = require("../controller/blog");
const {SucModel, ErrModel} = require("../model/resModel")
const {blogApi} = require("../conf/api")

const handleBlogRouter = (req,res)=>{
    const method = req.method;
    const path = req.path;
    const query = req.query;

    //列表
    if(method=='GET'&&blogApi.list){
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        return getList(author,keyword).then(listData=>{
            return new SucModel(listData)
        })
    }

    //详情
    if(method=='GET'&&blogApi.detail){
        const id = query.id ||"";
        return getDetail(id).then(data=>{
            return new SucModel(data)
        })

    }

    //新建
    if(method=='POST'&&blogApi.new){
        req.body.author = "lzh"
        return newBlog(req.body).then(data=>{
            return new SucModel(data)
        })
    }

    //更新
    if(method=='POST'&&blogApi.update){
        return updateBlog(req.body).then(res=>{
            if(res){
                return new SucModel('更新成功')
            }else {
                return new ErrModel('更新失败')
            }
        })
    }

    //删除
    if(method=='GET'&&blogApi.del){
        return delBlog(query.id,'lzh').then(res=>{
            if(res){
                return new SucModel('删除成功')
            }else {
                return new ErrModel('删除失败')
            }
        })
    }

}

module.exports = handleBlogRouter