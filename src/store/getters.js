import { initRouter } from '@/filter/routerFilter';
const getters = {
    navs: state=>state.app.navs,
    layout: state=>state.app.layout,
    token: state=>state.user.token,
    isLock: state=>state.app.isLock,
    log_in: state=>state.user.log_in,
    sys_routers:  state=>{
        console.log("正在获取路由。。。");
        if(state.app.sys_routers==null){
            return null;
        }
        return initRouter(state.app.sys_routers);
    }
}
export default getters;