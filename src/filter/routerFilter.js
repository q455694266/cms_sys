//动态加载组件优化
const Layout = r => require.ensure([], () => r(require('@/views/layout/Layout')), 'layout')
const Main = r => require.ensure([], () => r(require('@/views/layout/Main')), 'layout')
const Login = r => require.ensure([], () => r(require('@/views/login/Login')), 'login')
const Config = r => require.ensure([], () => r(require('@/views/config/Config')), 'config')
const Content = r => require.ensure([], () => r(require('@/views/config/Config')), 'content')
const Pages = r => require.ensure([], () => r(require('@/views/pages/Pages')), 'pages')
const Product = r => require.ensure([], () => r(require('@/views/product/Product')), 'product')
const Comment = r => require.ensure([], () => r(require('@/views/comment/Comment')), 'comment')
const Users = r => require.ensure([], () => r(require('@/views/users/Users')), 'users')
const Task = r => require.ensure([], () => r(require('@/views/task/Task')), 'task')
const Datas = r => require.ensure([], () => r(require('@/views/datas/Datas')), 'datas')
const Counts = r => require.ensure([], () => r(require('@/views/counts/Counts')), 'counts')
export function initRouter(routers) {
    let routerList = [];
    routers.forEach(v => {
        if (v.component) {
            v.component = eval(v.component);
        }
        if(!v.props){
            delete v.props;
        }
        if (v.pid == 0) {
            //路由分组
            // if(!routerList['g_'+v.groupId]){
            //     routerList['g_'+v.groupId] = new Array;
            // }
            // routerList['g_'+v.groupId].push(v); 
            routerList.push(v); //顶级路由
        }
        //找此路由所有子路由
        let children = routers.filter(c => c.pid === v.routerId);
        if (children.length > 0) {
            v.children = Array.from(children);
        }
    });
    console.log('路由组装完成');
    console.log(routerList);
    return routerList;

}