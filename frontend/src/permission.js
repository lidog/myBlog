/*
 * @Author lizhenhua
 * @version 2019/4/10
 * @description
 */
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getToken,removeToken} from "@/util/cookie.js"
import { MessageBox } from 'element-ui';


router.beforeEach((to, from, next) => {
  NProgress.start()
  let toName = to.name;
  let token = getToken()
  if(!token&&toName!=='register'){
    alert("请先登录或者注册")
    next('/register')
    NProgress.done() // 进度
  }else{
    if(toName==='register') removeToken();
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

