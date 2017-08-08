import { initRouter } from '@/filter/routerFilter';
// const Layout = r => require.ensure([], () => r(require('@/views/layout/Layout')), 'layout')
// const Main = r => require.ensure([], () => r(require('@/views/layout/Main')), 'layout')
// const Login = r => require.ensure([], () => r(require('@/views/login/Login')), 'login')
// const Config = r => require.ensure([], () => r(require('@/views/config/Config')), 'config')
// const Content = r => require.ensure([], () => r(require('@/views/config/Config')), 'content')
// const Pages = r => require.ensure([], () => r(require('@/views/pages/Pages')), 'pages')
// const Product = r => require.ensure([], () => r(require('@/views/product/Product')), 'product')
// const Comment = r => require.ensure([], () => r(require('@/views/comment/Comment')), 'comment')
// const Users = r => require.ensure([], () => r(require('@/views/users/Users')), 'users')
// const Task = r => require.ensure([], () => r(require('@/views/task/Task')), 'task')
// const Datas = r => require.ensure([], () => r(require('@/views/datas/Datas')), 'datas')
// const Counts = r => require.ensure([], () => r(require('@/views/counts/Counts')), 'counts')
// const testRouters = [
//     {
//         path: '/system',
//         name: '系统',
//         component: Layout,
//         redirect: '/system/info',
//         meta: { id: 1 ,pid:0},
//         children: [
//             { name: '系统信息', path: '/system/info', component: Main, meta: { id: 2, pid: 1 } },
//             {
//                 name: '系统设置', path: '/system/config/', component: Config, meta: { id: 3, pid: 1 }, children: [
//                     { name: '站点设置', path: '/system/config/1', component: Config, meta: { id: 4, pid: 3 } },
//                     { name: 'SEO设置', path: '/system/config/2', component: Config, meta: { id: 5, pid: 3 } }
//                 ]
//             },
//             {
//                 name: '用户管理', path: '/system/suser', component: Main, meta: { id: 6, pid: 1 },children: [
//                     { name: '用户分组', path: '/system/suer/group', component: Main, meta: { id: 7, pid: 6 }},
//                     { name: '权限设置', path: '/system/suer/permission', component: Main,meta: { id: 8, pid: 6 } },
//                     { name: '用户列表', path: '/system/suer/list', component: Main ,meta: { id: 9, pid: 6 }},
//                     { name: '行为日志', path: '/system/suer/log', component: Main,meta: { id: 10, pid: 6 } }
//                 ]
//             },
//             {
//                 name: '系统模块', path: '/system/model', component: Main, meta: { id: 11, pid: 1 },children: [
//                     { name: '路由管理', path: '/system/model/router', component: Main ,meta: { id: 12, pid: 11 }}, 
//                     { name: 'Api管理', path: '/system/model/api', component: Main,meta: { id: 13, pid: 11 } }
//                 ]
//             },
//             {
//                 name: '数据管理', path: '/system/data', component: Main,meta: { id: 14, pid: 1 }, children: [
//                     { name: '数据库备份/还原', path: '/system/data/backup', component: Main,meta: { id: 15, pid: 14 } },
//                     { name: '数据监控', path: '/system/data/watch', component: Main,meta: { id: 16, pid: 14 } }
//                 ]
//             }
//         ]
//     },{
//         path: '/content',
//         name: '内容',
//         component: Layout,
//         //redirect: '/content/info',
//         meta: { id: 17 ,pid:0}
//      },{
//         path: '/product',
//         name: '产品',
//         component: Layout,
//         //redirect: '/content/info',
//         meta: { id: 18 ,pid:0}
//      },{
//         path: '/member',
//         name: '会员',
//         component: Layout,
//         //redirect: '/content/info',
//         meta: { id: 19 ,pid:0}
//      },{
//         path: '/ad',
//         name: '广告',
//         component: Layout,
//         //redirect: '/content/info',
//         meta: { id: 20 ,pid:0}
//      },{
//         path: '/task',
//         name: '任务',
//         component: Layout,
//         //redirect: '/content/info',
//         meta: { id: 21 ,pid:0}
//      },{
//         path: '/extends',
//         name: '扩展',
//         component: Layout,
//         //redirect: '/content/info',
//         meta: { id: 22 ,pid:0}
//      }
// ];
const getters = {
    navs: state => state.app.navs,
    layout: state => state.app.layout,
    token: state => state.user.token,
    isLock: state => state.app.isLock,
    log_in: state => state.user.log_in,
    sys_routers: state => {
        console.log("正在获取路由。。。");
        if (state.app.sys_routers == null) {
            return null;
        }
        return initRouter(state.app.sys_routers);
    },
    userInfos: state => state.user.infos,
    // testRouters: state => testRouters,
    topRouter: state=>state.app.currentTopRouter
}
export default getters;