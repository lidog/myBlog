/**
 * Created by lizhenhua on 2019/4/5.
 */
const querystring = require('querystring')
const handleBlogRouter = require('../src/router/blog')
const handleUserRouter = require('../src/router/user')
const checkLogin = require('../src/router/checkLogin.js')
const {userApi} = require("../src/conf/api")
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
    return new Promise((resolve, reject) => {
        if (req.method !== "POST" || req.headers['content-type'] !== "application/json") {
            resolve({})
            return
        }
        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                console.log('end bad postData', postData)
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}


//获取cookie 过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (20 * 60 * 60 * 1000))
    return d.toGMTString()
}


const serverHandle = async (req, res) => {
    res.setHeader('Content-type', 'application/json')

    req.path = req.url.split("?")[0];
    req.query = querystring.parse(req.url.split("?")[1]);
    req.body = await getPostData(req);

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ""
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    //登录验证
    if (req.path !== userApi.login && req.path !== userApi.register) {
        const {httpCode} = await checkLogin(req)
        if (httpCode === 303) {
            res.writeHead(httpCode, {"content-type": "text/plain"})
            res.write("<h1 style='text-align: center'>not register</h1>")
            res.end()
            return
        }
    }

    //处理blog请求
    const blogResult = handleBlogRouter(req);//没有匹配路由返回underfined
    if (blogResult) {
        blogResult.then(blogData => {
            res.end(JSON.stringify(blogData))
        })
        return
    }

    //user请求
    const userResult = handleUserRouter(req);
    if (userResult) {
        userResult.then(userData => {
            if (userData.httpCode === 200) {
                res.setHeader('Set-Cookie', [
                    `userId=${userData.message};path=/;httpOnly;expires=${getCookieExpires()}`,
                    `token=${userData.message};path=/;expires=${getCookieExpires()}`,
                ])
            }
            res.end(JSON.stringify(userData))
        }).catch((err) => {
            console.error(err)
        })
        return
    }

    //非法请求
    res.writeHead(404, {"content-type": "text/plain"})
    res.write("<h1 style='text-align: center'>404 Not Found</h1>")
    res.end()

}

module.exports = serverHandle