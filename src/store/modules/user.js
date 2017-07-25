import { loginSystem } from '@/api/user';
import Cookies from 'js-cookie';
const user = {
    state: {
        token: Cookies.get('sys-token'),
        roles: [],
        access: [],
        permission: [],
        props: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_ACCESS: (state, access) => {
            states.access = access;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = permission;
        },
        SET_PROPS: (state, props) => {
            state.props = props;
        }
    },
    actions: {
        //后台登录
        LoginSystem({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginSystem(userInfo.username, userInfo.password, userInfo.checkcode).then(response => {
                    commit('SET_TOKEN', response.object.token);
                    Cookies.set('sys-token', response.object.token);
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
        Cookies.remove('sys-token');
        resolve();
      });
    },

    }
}
export default user;