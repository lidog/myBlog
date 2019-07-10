import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['page/register'], resolve)
    },
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['page/home'], resolve)
    },
    {
      path: '/blog',
      name: 'blog',
      component: resolve => require(['page/blog'], resolve)
    },
    {
      path: '/mood',
      name: 'mood',
      component: resolve => require(['page/mood'], resolve)
    },
    {
      path: '/note',
      name: 'note',
      component: resolve => require(['page/note'], resolve)
    },
    {
      path: '/article',
      name: 'article',
      component: resolve => require(['page/article'], resolve)
    },
  ]
})
