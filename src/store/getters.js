
const getters = {
    navs: state=>state.app.navs,
    layout: state=>state.app.layout,
    token: state=>state.user.token,
    isLock: state=>state.app.isLock,
    log_in: state=>state.user.log_in
}
export default getters;