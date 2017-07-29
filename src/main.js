// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios';
//同步请求工具
import $jq from  'jquery';
import store from './store/';
import 'iview/dist/styles/iview.css';
import '^/css/layout.css';

// //动态加载组件优化
// const Layout = r => require.ensure([], () => r(require('@/views/layout/Layout')), 'layout')
// const Main = r => require.ensure([], () => r(require('@/views/layout/Main')), 'layout')
// const Login = r => require.ensure([], () => r(require('@/views/login/Login')), 'login')
// const Config = r => require.ensure([], () => r(require('@/views/config/Config')), 'config')
// const Content = r => require.ensure([], () => r(require('@/views/config/Config')), 'content')
Vue.config.productionTip = false
Vue.use(iView)
// let routerList = [];
// const initRouter = function (routerNode, allRouters) {
//     if (routerNode.component) {
//         routerNode.component = eval(routerNode.component);
//     }
//     if (routerNode.pid == 0) {
//         //路由分组
//         // if(!routerList['g_'+routerNode.groupId]){
//         //     routerList['g_'+routerNode.groupId] = new Array;
//         // }
//         // routerList['g_'+routerNode.groupId].push(routerNode); 
//         routerList.push(routerNode); //顶级路由
//     }
//     //找此路由所有子路由
//     let children = allRouters.filter(c => c.pid === routerNode.routerId);
//     if (children.length > 0) {
//         routerNode.children = Array.from(children);
//     }
// }

/**
 * 同步加载路由信息
 * */
if (!store.getters.sys_routers) {
    $jq.get({
        url:'/api/common/routers.json',
        async:false,
        success:function(data){
            if(data.object.length>0){
                 store.commit('SET_ROUTERS',data.object);
            }
           else{
               iView.Modal.error('路由加载失败！请刷新。');
           }
            console.log(data);
        }
    });
} 
// console.log('准备开始构造路由信息');
//   store.getters.sys_routers.forEach(v => {
//             initRouter(v, store.getters.sys_routers);
//     });
router.addRoutes(store.getters.sys_routers);
console.log('构造完成，已添加。');
//添加路由

//测试
const SYSUSER = {
    username: '张三',
    allow: [{ url: '/', name: '首页' }, { url: '/system/login', name: '系统登录' }, { url: '/system/main', name: '系统主页' }, { url: '/system/config', name: '系统设置' }],
    urls: []
}
SYSUSER.allow.forEach(o => {
    SYSUSER.urls.push(o.url);
});
//前端路由白名单
const allAllow = ['/system/login'];
//---------------------------------
//iView.Message.config({top:300});
router.beforeEach((to, from, next) => {
    //如果不在白名单且未登录,则跳转到登录页面
    if (allAllow.indexOf(to.path) == -1 && !store.getters.log_in) {
        iView.Modal.error({
            width: 280,
            title: '未授权的请求！',
            content: '<p>需要登录后才可访问!</p>',
            okText: '确定',
            onOk: () => {
                next('/system/login')
            }
        });
    }
    else if (SYSUSER.urls.find(url => url == to.fullPath)) {
        iView.LoadingBar.start();
        next();
    }
    else {
        iView.Message.error('无权访问');
    }

});

router.afterEach((to, from, next) => {
    //console.log(to.path);
    store.state.app.navs.current = to.path;
    iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    mounted(){
        console.log('创建完成');

    }
})
