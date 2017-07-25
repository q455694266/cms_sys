import service from '@/util/fetch';
//锁屏
export function lockSystem(){
    return service({
        url: '/api/lockSystem',
        method: 'post'
    })
}
//解锁
export function unlockSystem(check){
    const data ={
        check
    }
    return service({
        url: '/api/unlockSystem',
        method: 'post',
        data:data
    })
}