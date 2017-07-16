// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios'; 
import store from './store/';
import 'iview/dist/styles/iview.css';
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

//---------------------------------
//iView.Message.config({top:300});
router.beforeEach((to, from, next) => {
    if (SYSUSER.urls.find(url => url == to.fullPath)) {
        //设置当前导航的路由URL
        // console.log(to.path);
        // console.log(store.state.app.navs);
        //store.state.app.navs.current = to.path;
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
