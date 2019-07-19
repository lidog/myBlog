/*
 * @Author lizhenhua
 * @version 2019/7/17
 * @description 
 */
const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
    constructor(){
        //存放中间件的列表
        this.routes = {
            all:[], //保存所有app.use 注册的中间件
            get:[],//app.get 注册
            post:[]//app.post 注册
        }
    }

    /**
     * 通用的注册中间件的方法，用于处理中间件参数
     * 处理情况：
     * app.use(fn)
     * app.use('/api',fn)
     * app.use('/api',fn,fn2,fn3)
     * app.get,app.post 都是一样的
     * 作用，就是输出一个 info对象，
     * info.path 保存注册命中路由
     * info.stack 保存中间件所有处理函数
     */
    register(path){
        const info = {}
        //express 注册中间件时，如果不传url，表示全部命中
        //如果第一个参数是一个字符串，代表是一个url ，存在path
        if(typeof path ==='string'){
            info.path = path
            //从第二个参数开始是中间件
            // 把中间件全部压入 stack
            info.stack = slice.call(arguments,1)
        }else { //否则，表示第一个参数是默认跟路由
            info.path = '/'
            //没有url，表示全部是中间件回调函数，从0开始全部压入stack
            info.stack = slice.call(arguments,0)
        }
        return info
    }

    use(){
        //调用register 函数，处理好传入的中间件，得到一个info对象
        const info = this.register.apply(this,arguments);
        //把得到的中间件放入 全局的 routes.all 中，表示这个中间件注册到了all队列
        this.routes.all.push(info)
    }
    get(){
        const info = this.register.apply(this,arguments);
        //表示这个中间件注册到了get队列
        this.routes.get.push(info)
    }
    post(){
        const info = this.register.apply(this,arguments);
        //表示这个中间件注册到了post队列
        this.routes.post.push(info)
    }
    /**
    * 功能：处理app.listen 的情况
     * 例如： app.listen(3000,fn)
    */
    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args) //直接把原来的参数透传到原生的node 的server上
    }

    callback(){
        return (req,res)=>{
            //定义res.json 响应函数
            res.json = (data)=>{
                res.setHeader('Content-type','application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()

            //通过match 函数，拿到那些匹配的中间件
            const resultList = this.match(method,url)
            //把命中的中间件拿去handle 中执行
            this.handle(req,res,resultList)
        }
    }

    /**
    * 功能：帅选所有命中的中间件
    */
    match(method,url){
        let stack = [] //保存所有符合的中间件
        if(url==='/favicon.io'){ //忽略浏览器请求
            return stack
        }
        //拿到所有中间件，合并到curRoutes 中
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])//method == get||post
        curRoutes.forEach(routeInfo=>{
            //indexOf ===0 会命中三种情况，恰巧符合中间件的path定义
            // '/'（命中所有） , '/api' （特定开头）,'/api/user/list'（完整命中）
            if(url.indexOf(routeInfo.path)===0){
                stack = stack.concat(routeInfo.stack)
            }
        })
        //返回所有命中的中间件组成的数组
        return stack
    }

    /**
    * 功能：顺序执行中间件数组stack；核心的 next 机制
    * 参数：stack 是所有命中的中间件
    * 返回值：
    */
    handle(req,res,stack){
        const next = ()=>{
            //拿到第一个匹配的中间件
            const middleware = stack.shift() //每次切割1个
            if(middleware){
                //因为next重新被传入，所以如果再middleware中如果执行next()
                // 表示进入了下一个中间件
                middleware(req,res,next)
            }
        }
        next()
    }

}

module.exports = () =>{
    return new LikeExpress()
}


//执行顺序
// use/get/post 注册中间件
// 通过 共用的register 函数，把中间件对应分配的 routes.all /.get /.post 数组中
// 调用 app.listen(3000,callback)
// 实际是调用了原生的 http.createServer(this.callback()) 创建了一个http服务
// http被请求后，会执行callback
// callback 中通过match 得到所有命中了method 和 url 的中间件，然后调用 handle 函数依次执行
// match 函数，通过判断 url 的几种情况 处理命中逻辑，’/‘, '/api','/api/user/list'，遍历所有中间件，返回命中的中间件
// handle 巧妙的利用递归，定义一个next 函数，每次运行next 就取出从命中中间件中取出第一个，直到stack为空
// let meddleWare = slice.call(stack,1);
// 运行 meddleware(req,res,next)
// 如果 meddleware 中运行了自己逻辑后，运行传入的next(), 就会重复去拿到一个meddleware 执行，依次，直到最后命中的stack 清空