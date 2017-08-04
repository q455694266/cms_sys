// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios';
//同步请求工具
import $jq from 'jquery';
import store from './store/';
import 'iview/dist/styles/iview.css';
import '^/css/layout.css';

Vue.config.productionTip = false
Vue.use(iView)
/**
 * 同步加载路由信息
 * */

if (!store.getters.sys_routers) {
    $jq.get({
        url: '/api/common/routers.json',
        async: false,
        success: function (data) {
            if (data.object.length > 0) {
                store.commit('SET_ROUTERS', data.object);
            }
            else {
                iView.Modal.error({ width: 280, title: '路由加载失败!', content: '<h3>没有找到路由列表。</h3>' });
            }
            console.log(data);
        },
        error: function () {
            iView.Modal.error({ width: 280, title: '网络错误！', content: '<h3>路由加载失败!</h3>' });
        }
    });
}
//添加路由
if (store.getters.sys_routers) {
    router.addRoutes(store.getters.sys_routers);
    //前端路由白名单
    const allAllow = ['/system/login'];
    //---------------------------------
    //iView.Message.config({top:300});

    router.beforeEach((to, from, next) => {
        //如果在白名单放行
        if(allAllow.indexOf(to.path) != -1){
            iView.LoadingBar.start();
            next();
        }else if(!store.getters.log_in){
             iView.Modal.error({
                width: 280,
                title: '未授权的请求！',
                content: '<p>需要登录后才可访问!</p>',
                okText: '确定',
                onOk: () => {
                    next('/system/login')
                }
            });

        }else{
            let current = store.getters.sys_routers[0].children.find((r) => to.path == r.path);
            if (current&&store.getters.userInfos&&store.getters.userInfos.r.find(id => id == current.routerId)) {
                iView.LoadingBar.start();
                next();
            }else{
                iView.Message.error('无权访问');
            }

        }
    });

    router.afterEach((to, from, next) => {
        store.state.app.navs.current = to.path;
        iView.LoadingBar.finish();
    });

    //---------------------

    console.log('构造完成，已添加。');
} else {
    iView.Message.error({
        content: '初始化路由失败！！请刷新重试。',
        duration: 0
    });
    Promise.reject("初始化路由失败！！！！");
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    mounted() {
        console.log('创建完成');

    }
})
