<template>
  <div class="layout-left">
    <Menu ref="leftMenu" class="nav-menu" :open-names="open" :active-name="navs.current" width="200px" accordion  :theme="theme1"  @on-select="actionTo">
      <Submenu v-if="route.children&&route.children.length>0&&route.status!=0" v-for="(route,index) in topRouter.children" :key="index" :name="route.path">
        <template slot="title">
          <Icon v-if="route.icon" :type="route.icon" size="24"></Icon>
          {{route.name}}
        </template>
        <Menu-item v-for="(routeChild,index) in  route.children" :key="index" :name="routeChild.path">{{routeChild.name}}
          <Icon v-if="routeChild.icon" :type="routeChild.icon" size="24"></Icon>
        </Menu-item>
      </Submenu>
      <Menu-item v-else :name="route.path">
        <Icon v-if="route.icon" :type="route.icon" size="24"></Icon>
        {{route.name}}
      </Menu-item>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['navs','sys_routers','topRouter'])
  },
  data() {
    return {
           theme1: 'light',
           open:this.$route.matched.map(r=>r.path)
    }
  }, methods: {
    actionTo(e) {
      this.$router.push(e);
    },
    setLeftMenuActive(){
      this.$refs.leftMenu.currentActiveName = this.navs.current;
    }
  },mounted(){
     this.$refs.leftMenu.updateActiveName();
  },watch: {
   '$route'(){
    //  console.log('当前路由:'+this.navs.current); 
    //  console.log('---------------')
    //  console.log("展开:"+this.open);
    //  console.log('当前激活:'+this.$refs.leftMenu.currentActiveName)
     this.$nextTick(function() {
                this.$refs.leftMenu.updateOpened();
                this.$refs.leftMenu.updateActiveName();
      })
    }
}}
</script>

<style scoped>
.layout-left {
  width: 200px;
  height: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  /* border-top: solid 1px #DDDEE1; */
}

.nav-menu {
  height: 100%;
  width: 200px;
}
</style>
