<template>
  <div class="layout-left">
    <Menu ref="leftMenu" class="nav-menu" width="200px" accordion active-name="/system/main" @on-select="actionTo">
      <Submenu v-if="route.children&&route.children.length>0&&route.status!=0" v-for="(route,index) in sys_routers[0].children" :key="index" :name="route.path">
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
    ...mapGetters(['navs','sys_routers'])
  },
  data() {
    return {
    }
  }, methods: {
    actionTo(e) {
      this.$router.push(e);
      this.$refs.leftMenu.currentActiveName = this.navs.current;
    }

  },mounted(){
    //直接刷新加载需设置当前活动菜单
    this.$refs.leftMenu.currentActiveName = this.$router.currentRoute.path;
    
  }
}
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
