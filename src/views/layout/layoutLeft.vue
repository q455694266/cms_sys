<template>
  <div class="layout-left">
    <Menu ref="leftMenu" class="nav-menu" width="200px" accordion active-name="/system/main" @on-select="actionTo">
      <Submenu v-if="route.children&&route.children.length>0&&!route.noDropdown" v-for="(route,index) in $router.options.routes[1].children" :key="index" :name="route.path">
        <template slot="title">
          <Icon :type="route.icon"></Icon>
          {{route.name}}
        </template>
        <Menu-item v-for="(routeChild,index) in  route.children" :key="index" :name="routeChild.path">{{routeChild.name}}
          <Icon v-if="routeChild.icon" :type="routeChild.icon"></Icon>
        </Menu-item>
      </Submenu>
      <Menu-item v-else :name="route.path">
        <Icon :type="route.icon"></Icon>
        {{route.name}}
      </Menu-item>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
   computed: {
        ...mapGetters(['navs'])
    },
  data() {
    return {
    }
  }, methods: {
    actionTo(e) {
      this.$router.push(e);
      this.$refs.leftMenu.currentActiveName = this.navs.current;
    }

  }
}
</script>

<style scoped>
.layout-left {
  width: 200px;
  height: 100%;
  position: fixed;
  border-top: solid 1px #DDDEE1;
}

.nav-menu {
  height: 100%;
  width: 200px;
}
</style>
