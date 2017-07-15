<template>
    <div class="layout-top">
        <div class="logo">
            <router-link to="/system/main">Ziyacms</router-link>
        </div>
        <div class="top-control">
            <Row type="flex">
                <Col class="top-right" span="18" push="6">
                <Button-group class="btn-control" size="large">
                    <Button type="ghost">帮助</Button>
                    <Button type="ghost">清除缓存</Button>
                    <Button type="ghost">计划任务</Button>
                    <Dropdown class="iuser">
                        <a href="javascript:void(0)">
                            <Icon type="person" /> 超级管理员
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list" style="margin-top:-5px">
                            <Dropdown-item>
                                <Icon type="android-settings"></Icon>&nbsp&nbsp设置</Dropdown-item>
                            <Dropdown-item>
                                <Icon type="android-lock"></Icon>&nbsp&nbsp锁屏</Dropdown-item>
                            <Dropdown-item divided>
                                <Icon type="power"></Icon>&nbsp&nbsp登出</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </Button-group>
    
                </Col>
                <Col class="top-left" span="6" pull="18">
                <Button-group>
                    <Button type="ghost" @click="handleExpand">
                        <Icon type="navicon" size="20"></Icon>
                    </Button>
                    <Button type="ghost" @click="handleFullscreen">
                        <Icon :type="minMaxIcon" size="20"></Icon>
                    </Button>
                    <Button type="ghost">
                        <Icon type="printer" size="20"></Icon>
                    </Button>
                </Button-group>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['layout'])
    },
    data() {
        return {
            minMaxIcon: 'arrow-expand'
        }
    }, methods: {
        handleExpand() {
            this.layout.isExpand = !this.layout.isExpand;
        },
        handleFullscreen() {
            this.layout.isFullScreen = !this.layout.isFullScreen;
            
        }
    }, mounted() {
        
    },watch:{
        'layout.isFullScreen':function(){
            this.minMaxIcon = this.layout.isFullScreen?'arrow-shrink':'arrow-expand';
        }
    }

}
</script>
<style scoped>
.layout-top {
    height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    border-bottom: solid 1px #dddee1;
    background: #FFF;
}

.logo {
    width: 200px;
    position: absolute;
}

.logo a {
    line-height: 60px;
    font-size: 24px;
    color: #333;
    display: block;
    padding-left: 28px;
}

.top-control {
    margin-left: 200px;
}

.btn-control {
    margin-top: 10px;
    margin-right: 5px;
    float: right;
}

.btn-control>.ivu-btn {
    font-size: 18px;
    border: none;
    border-radius: 0;
    margin-left: 20px;
    border: 1px solid #FFF;
}

.btn-control>.ivu-btn:hover,
.btn-control>.ivu-btn:active {
    border: 1px solid #2b85e4;
}

.top-control,
.top-control>div {
    height: 60px;
}

.btn-control .iuser {
    font-size: 16px;
    margin: 10px 20px 0px 20px;
}

.iuser a {
    color: #495060;
}

.iuser:hover .ivu-icon-arrow-down-b {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: -webkit-transform 0.2s ease-out;
    -moz-transition: -moz-transform 0.2s ease-out;
    transition: transform 0.2s ease-out;
}

.top-left .ivu-btn-group {
    margin-top: 20px;
}

.top-right {
    /* background: yellow; */
}
</style>
