import service from '@/util/fetch';

//登录
export function loginSystem(username, password, checkcode) {
    const data = {
        username,
        password,
        checkcode
    };
    return service({
        url: '/api/loginSystem',
        method: 'post',
        data
    });
}
//登出
export function logoutSystem(){
    return service({
        url: '/api/logoutSystem',
        method: 'post'
    })
}
