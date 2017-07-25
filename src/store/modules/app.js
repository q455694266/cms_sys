import { lockSystem, unlockSystem } from '@/api/app';
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
        }
    },
    mutations: {
        'SET_LOCK': (state, isLock) => {
            state.isLock = isLock;
        }
    },
    actions: {
         LockSystem({ commit },check) {
            return new Promise((resolve, reject) => {
                lockSystem(check).then(response => {
                    Cookies.set('isLock',true);
                    commit('SET_LOCK', true);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            })
        },
        UnlockSystem({commit},check){
            return new Promise((resolve,reject)=>{
                unlockSystem(check).then(response=>{
                    Cookies.remove('isLock');
                    commit('SET_LOCK', false);
                    console.log(response);
                    resolve();
                }).catch(error=>{
                    reject(error);
                });

            });
        }
    }
}
export default app;