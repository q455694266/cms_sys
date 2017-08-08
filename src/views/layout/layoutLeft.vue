<template>
  <div class="layout-left">
    <Menu ref="leftMenu" class="nav-menu" width="200px" accordion :theme="theme1" :open-names="open" :active-name="active" @on-select="actionTo">
      <Submenu v-if="route.children&&route.children.length>0&&route.status!=0" v-for="(route,index) in topRouter.children" :key="index" :name="route.path">
        <template slot="title">
          <Icon :type="route.icon" size="20"></Icon>
          {{route.name}}
        </template>
        <Menu-item v-for="(routeChild,index) in  route.children" :key="index" :name="routeChild.path">{{routeChild.name}}
          <Icon v-if="routeChild.icon" :type="routeChild.icon" size="20"></Icon>
        </Menu-item>
      </Submenu>
      <Menu-item v-else :name="route.path">
        <Icon :type="route.icon" size="20"></Icon>
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
            open: [],
            active: "1-2"
    }
  }, methods: {
    actionTo(e) {
      this.$router.push(e);
      this.$refs.leftMenu.currentActiveName = e;
    }
  },mounted(){
    //直接刷新加载需设置当前活动菜单
    this.$refs.leftMenu.currentActiveName = this.$router.currentRoute.path;
     this.$nextTick(function() {
               // this.open = ["2"];
               // this.active = ["1-2"];
                this.$refs.leftMenu.updateOpened();
                this.$refs.leftMenu.updateActiveName();
                
       })
  },watch: {
   
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
