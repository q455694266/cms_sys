
const getters = {
    navs: state=>state.app.navs,
    layout: state=>state.app.layout,
    token: state=>state.user.token,
    isLock: state=>state.app.isLock
}
export default getters;