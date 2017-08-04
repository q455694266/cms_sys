import axios from 'axios';
import store from '../store';
import Message from 'iview/src/components/message';
import Modal from 'iview/src/components/modal';
//封装axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000,                  // 请求超时时间
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
});
//错误提示modal
const modalError = (errorMsg, errorTitle = '请求错误！') => {
    Modal.error({
        width: 240,
        title: errorTitle,
        content: '<p>' + errorMsg + '</p>'
    });
}
const delError = (errorCode) => {
    switch (errorCode) {
        case 403:
            modalError('拒绝访问!');
            break;
        case 404:
            modalError('请求资源不存在！');
            break;
        case 400:
            modalError('错误的请求！');
            break;
        case 401:
            modalError('未授权的请求！');
            break;
        case 405:
            modalError('错误的请求方式！');
            break;
        case 415:
            modalError('不支持的请求类型');
            break;
        case 421:
            modalError('验证错误！！');
            break;
        case 422:
            modalError('错误次数过多,已锁定！稍后尝试。');
            break;
        case 433:
            modalError('用户已锁，请解锁后操作！');
            break;

        // case 412:
        //     modalError('账号或密码错误！');
        //     break;
        case 443:
        case 444:
            Modal.confirm({
                width: 280,
                title: errorCode==443?'授权已过期！':'无效的授权！',
                content: '<p>需要登录后才可访问！是否登录？</p>',
                okText: '确定登录',
                onOk: () => {
                   store.dispatch('FedLogOut').then(() => location.href = '/system/login');
                }
            })
            break;
        case 500:
            modalError('内部错误');
            break;
        case 503:
        case 504:
            modalError('服务器不可用');
            break;
        default:
            //modalError('请求失败!');
            break;
    }
}

service.interceptors.request.use((config) => {
    store.state.app.layout.spinShow = true;
    // if (store.getters.token) {
    //     // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    //     config.headers['Authrorization'] = store.getters.token;
    // }
    return config;

    // if(store.getters.log_in){
    //     return config;
    // }else{
    //     delError(444);
    //     Promise.reject("未登录.");
    // }
    
}, (error) => {
    store.state.app.layout.spinShow = false;
    Message.error('加载超时 ！');
    Promise.reject(error);
})
// respone拦截器
service.interceptors.response.use(
    response => {
        store.state.app.layout.spinShow = false;
        //通过响应状态码来自定义响应处理
        const code = parseInt(response.data.code);
        if (code != 200) {
            delError(code);
            return Promise.reject(response.data.msg);
        } else {
            return response.data;//只获取数据相关
        }

    },
    error => {
        store.state.app.layout.spinShow = false;
        if (error.response) {
            delError(error.response.status);
        }
        return Promise.reject(error);   // 返回接口返回的错误信息
    }
)

export default service;