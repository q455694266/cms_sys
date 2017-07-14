import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Layout from '@/views/layout/Layout'
import Main from '@/views/layout/Main'
import Login from '@/views/login/Login'
import Config from '@/views/config/Config'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '后台首页',
      component: Layout,
      redirect: '/system/main',
      hidden: true
    },
    {
      path: '/system',
      name: 'SYSTEM',
      component: Layout,
      redirect: '/system/main',
      icon: 'icon-computer',
      children: [
        { name: '控制面板', path: '/system/main', icon: 'home', component: Main },
        { name: '系统配置', path: '/system/config', icon: 'android-settings', component: Config },
        {
          name: '内容管理', path: '/system/content', icon: 'ios-paper-outline', children: [
            { name: '内容分类', path: '/system/content/types' }, 
            { name: '内容列表', path: '/system/content/list' },
            { name: '内容发布', path: '/system/content/add', icon: 'plus-round'}
          ]
          //,noDropdown:true
        },
        { name: '页面管理', path: '/system/pages', icon: 'icon-pageset' },
        { name: '产品管理', path: '/system/product', icon: 'icon-publishgoods_fill' },
        { name: '评论管理', path: '/system/comment', icon: 'icon-message' },
        { name: '用户管理', path: '/system/users', icon: 'icon-people' },
        { name: '数据管理', path: '/system/datas', icon: 'icon-shujuku' },
        { name: '系统统计', path: '/system/counts', icon: 'icon-tiaoxingtu-xianxing' }]
    }
    , {
      path: '/system/login',
      name: '系统登录',
      component: Login
    }
  ]
})

export default router;