import service from '@/util/fetch';
export  function getAllConfigs(){
    return service({
        url:'/api/configs',
        method:'get'
    });
}
export function updateConfigs(datas){
    return service({
        url:'/api/configs',
        method: 'put',
        data:datas
    });
}