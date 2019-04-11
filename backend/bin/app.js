/**
 * Created by lizhenhua on 2019/4/5.
 */

const querystring = require('querystring')
const handleBlogRouter = require('../src/router/blog')
const handleUserRouter = require('../src/router/user')

/*
* conf 文件夹 项目配置文件夹
* controller 文件夹 处理响应数据
* db 文件夹 链接数据库，对我提供执行sql函数
* model 文件夹 处理响应格式
* router 文件夹 放置路由相关的处理;只关心什么请求,和响应格式,信息等
* router => 分配请求 => controller 处理并返回数据 => model 封装数据为固定格式
* */

//pormise 获得post 数据
const getPostData = function (req) {
    return new Promise((resolve,reject)=>{
        if(req.method !== "POST"||req.headers['content-type']!=="application/json"){
            resolve({})
            return
        }
        let postData = ""
        req.on('data',chunk =>{
            postData+=chunk.toString();
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}


const serverHandle = (req,res)=>{
    res.setHeader('Content-type','application/json')

    req.path = req.url.split("?")[0];

    req.query = querystring.parse(req.url.split("?")[1]);

    //处理cookie
    // req.cookie = {};
    // const cookie = req.headers.cookie || " ";// k2=v2;k3=v3;
    // cookie.split(";").forEach(item=>{
    //     let arr = item.split('=');
    //     req.cookie[arr[0].trim()] = arr[1].trim();
    // })

    getPostData(req).then(postData=>{

        req.body = postData;

        //处理blog请求
        const blogResult = handleBlogRouter(req,res);
        if(blogResult){
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }


        //user请求
        const userResult = handleUserRouter(req,res);
        if(userResult){
            userResult.then(userData=>{
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        //非法请求
        res.writeHead(404,{"content-type":"text/plain"})
        res.write("<h1 style='text-align: center'>404 Not Found</h1>")
        res.end()
        return

    })
}

module.exports = serverHandle