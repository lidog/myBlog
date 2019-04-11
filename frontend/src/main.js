// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//install ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//加入路由控制&进度条
import '@/permission' // permission control

//引入公共样式
import '@/common/reset.css'
import '@/common/util.scss'
import '@/common/common.scss'

//引入全局组件
import slide from "@/components/slide.vue"
Vue.component('slide',slide)

//引入工具库
import tools from "@/util/tools"
Vue.prototype.tools = tools;

//引入 api 表
import ajaxApi from "@/util/ajaxApi"
Vue.prototype.ajaxApi  = ajaxApi

//引入 axios 实例
import $http from '@/util/$http'
Vue.prototype.$http = $http;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
