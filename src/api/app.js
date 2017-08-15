import service from '@/util/fetch';
//锁屏
export function lockSystem(check) {
    const data = {
        check
    }
    return service({
        url: '/api/lockSystem',
        method: 'post',
        data: data
    })
}
//解锁
export function unlockSystem(check) {
    const data = {
        check
    }
    return service({
        url: '/api/unlockSystem',
        method: 'post',
        data: data
    })
}
