import service from '@/util/fetch';
//友情链接Api
export function addLink(link){
    return service({
        url: '/api/link',
        method: 'post',
        data:link    
    });
}
export function deleteLink(id){
    return service({
        url:'/api/link',
        method:'delete',
        data:{id}
    });
}
export function updateLink(link){
    return service({
        url:'/api/link',
        method:'put',
        data:link
    });
}
export function getAllLinks(){
     return service({
        url:'/api/links',
        method:'get'
      })
}

