// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios'; 
import store from './store/';
import 'iview/dist/styles/iview.css';
import '^/css/layout.css';
Vue.config.productionTip = false
Vue.use(iView)

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
    if(allAllow.indexOf(to.path)==-1&&!store.getters.log_in){
         iView.Modal.error({
                    width:280,
                    title: '未授权的请求！',
                    content: '<p>需要登录后才可访问!</p>',
                    okText: '确定',
                    onOk: () => {
                     next('/system/login')
                    } 
                });
    }
    else  if (SYSUSER.urls.find(url => url == to.fullPath)) {
        iView.LoadingBar.start();
        next();
    }
    else{
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
    components: { App }
})
