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
        { name: '控制面板', path: '/system/main', icon: 'social-windows-outline', component: Main },
        { name: '系统配置', path: '/system/config', icon: 'ios-gear-outline', component: Config },
        {
          name: '内容管理', path: '/system/content', icon: 'ios-paper-outline', children: [
            { name: '内容分类', path: '/system/content/types' }, 
            { name: '内容列表', path: '/system/content/list' },
            { name: '内容发布', path: '/system/content/add', icon: 'plus-round'}
          ]
          //,noDropdown:true
        },
        { name: '页面管理', path: '/system/pages', icon: 'document' ,children:[
          {name: '自定义单页',path: '/system/pages/custom'},
          {name: '模板页',path: '/system/pages/template'}
        ]},
        { name: '产品管理', path: '/system/product', icon: 'bag' ,children: [
          {name: '产品分类', path: '/system/product/types'},
          {name: '产品列表', path: '/system/product/list'},
          {name: '产品模型', path: '/system/product/model'}
        ]},
        { name: '评论管理', path: '/system/comment', icon: 'ios-chatboxes-outline' },
        { name: '用户管理', path: '/system/users', icon: 'person-stalker',children:[
          {name:'用户组',path:'/system/users/group'},
          {name:'权限',path:'/system/users/permission'},
          {name:'用户列表',path:'/system/users/list'}
        ]},
        { name: '计划任务', path: '/system/tasks', icon: 'ios-alarm-outline' },
        { name: '数据管理', path: '/system/datas', icon: 'android-cloud-outline' },
        { name: '系统统计', path: '/system/counts', icon: 'stats-bars' }]
    }
    , {
      path: '/system/login',
      name: '系统登录',
      component: Login
    }
  ]
})

export default router;