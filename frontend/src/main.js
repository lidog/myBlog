// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//install ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import { MessageBox } from 'element-ui';


//加入路由控制&进度条
import '@/permission' // permission control

//引入公共样式
import '@/common/reset.css'
import '@/common/util.scss'
import '@/common/common.scss'

//引入全局组件
import slide from "@/components/slide.vue"
Vue.component('slide',slide)
import blogDetail from "@/components/blogDetail.vue"
Vue.component('blogDetail',blogDetail)

//引入markdown 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


//引入常用图标库
import feather from 'vue-icon'
Vue.use(feather, 'v-icon');

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




Vue.prototype.confirm = (tips='',sucBtn="确定",errBtn="取消",title="提示",type='warning')=>{
    return MessageBox.confirm(tips, title, {
        confirmButtonText: sucBtn,
        cancelButtonText: errBtn,
        type: type
    })
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
