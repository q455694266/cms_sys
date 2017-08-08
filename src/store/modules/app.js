import { lockSystem, unlockSystem, loadRouters } from '@/api/app';
import Cookies from 'js-cookie';

const app = {
    state: {
        isLock: Cookies.get('isLock'),
        layout: {
            isExpand: true,
            isFullScreen: false,
            spinShow: false
        },
        navs: {
            current: '/system/main'
        },
        sys_routers: JSON.parse(localStorage.getItem('app_routers')),
        currentTopRouter:null
    },
    mutations: {
        'SET_LOCK': (state, isLock) => {
            state.isLock = isLock;
        },
        'SET_ROUTERS': (state, sys_routers) => {
            state.sys_routers = sys_routers;
            if(sys_routers){
                    localStorage.setItem('app_routers', JSON.stringify(sys_routers));
            }
        },
        'SET_CURRENT_TOP_ROUTER':(state,router)=>{
            state.currentTopRouter = router;
        }
    },
    actions: {
        LockSystem({ commit }, check) {
            return new Promise((resolve, reject) => {
                lockSystem(check).then(response => {
                    Cookies.set('isLock', 1);
                    commit('SET_LOCK', 1);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            })
        },
        UnlockSystem({ commit }, check) {
            return new Promise((resolve, reject) => {
                unlockSystem(check).then(response => {
                    Cookies.remove('isLock');
                    commit('SET_LOCK', 0);
                    console.log(response);
                    resolve();
                }).catch(error => {
                    reject(error);
                });

            });
        }
    }
}
export default app;