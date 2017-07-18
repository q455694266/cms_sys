import service from '../util/fetch';
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
export function logoutSystem(){
    return service({
        url: '/api/logoutSystem',
        method: 'post'
    })
}