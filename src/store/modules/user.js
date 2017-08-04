import { loginSystem } from '@/api/user';
import Cookies from 'js-cookie';
const user = {
    state: {
        token: Cookies.get('Z-token'),
        infos:JSON.parse(localStorage.getItem('userInfos')),
        log_in: sessionStorage.getItem('log_in')
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_INFOS: (state, infos) => {
            state.infos = infos;
            localStorage.setItem('userInfos',JSON.stringify(infos))
        },
        SET_PROPS:(state,props)=>{
            state.infos.p = props;
        },
        SET_APIS:(state,apiIds)=>{
            state.infos.a = apiIds;
        },
        SET_ROUTERS:(state,routerIds)=>{
            state.infos.r = routerIds;
        },
        SET_LOG_IN: (state,flag) =>{
            state.log_in = flag;
            sessionStorage.setItem('log_in',flag);
        }
    },
    actions: {
        //后台登录
        LoginSystem({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginSystem(userInfo.username, userInfo.password, userInfo.checkcode).then(response => {
                   //commit('SET_TOKEN', Cookies.get('Z-token'));
                   //登录成功,更改标志
                   if(response.code=='200'){
                        commit('SET_LOG_IN',1);
                        commit('SET_INFOS',response.object);
                   }
                   resolve();
                }).catch(error => {
                    reject(error);
                });
            })
        },
        LogoutSystem({ commit }) {
            logoutSystem().then(response => {
                Promise.resolve();
            }).catch(error => {

            })
        },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        //Cookies.remove('log_in');
        sessionStorage.removeItem('log_in');
        resolve();
      });
    },
    //设置登录标志
    ControlLogIn({commit},flag){
        commit('SET_LOG_IN',flag);
    }

    }
}
export default user;