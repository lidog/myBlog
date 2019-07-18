/*
 * @Author lizhenhua
 * @version 2019/4/10
 * @description
 */
import router from './index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import {getToken,removeToken} from "@/util/cookie.js"
// import { MessageBox } from 'element-ui';


router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

