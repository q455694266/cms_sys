<template>
    <div class="container" ref="con">
        <layoutTop></layoutTop>
        <layoutLeft ref="leftNav"></layoutLeft>
        <div ref="mainBody" class="layout-body ToPrint">
            <router-view></router-view>
            <div class="layout-footer">版权所有www.ziyaweb.com 2016-2018</div>
        </div>
        <Spin size="large" fix v-if="layout.spinShow"></Spin>
        <Spin class="lockSpin" size="large" fix v-if="isLock">
            <div style="width:240px;margin:0 auto;">
              <Alert type="warning" show-icon>
        <h2>用户已锁定！</h2>
        <Icon size="20" type="information-circled" slot="icon"></Icon>
    </Alert>
                <Input type="password" v-model="unlockCheck">
                <span slot="prepend">
                    <Icon type="ios-unlocked-outline" size="20"></Icon>
                </span>
                <span slot="append">
                    <Button @click="handleUnlock">解锁</Button>
                </span>
                </Input>
            </div>
        </Spin>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import layoutTop from './layoutTop';
import layoutLeft from './layoutLeft';

export default {
    computed: {
        ...mapGetters(['layout', 'token', 'isLock'])
    },
    data() {
        return {
            unlockCheck: ''
        }
    },
    components: {
        layoutTop,
        layoutLeft
    },
    methods: {
        getCssStyle(element, att) {
            //获取样式 
            //特性侦测
            if (window.getComputedStyle) {
                //优先使用W3C规范
                return window.getComputedStyle(element)[att];
            } else {
                //针对IE9以下兼容
                return element.currentStyle[att];

            }

        },
        requestFullScreen(element) {
            var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
            if (requestMethod) {
                requestMethod.call(element);
            } else if (typeof window.ActiveXObject !== "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
            //收起左侧菜单
            this.layout.isExpand = false;
        },
        exitFull() {
            //手动关闭 判断各种浏览器，找到正确的方法
            //ESC和F11关闭全屏无法监听到！只能通过window.onresize来实现判断
            var exitMethod = document.exitFullscreen || //W3C
                document.mozCancelFullScreen ||    //Chrome等
                document.webkitExitFullscreen || //FireFox
                document.webkitExitFullscreen; //IE11
            if (exitMethod) {
                exitMethod.call(document);
            }
            else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    this.changeViewScreen();
                    wscript.SendKeys("{F11}");
                }
            }
            //展开左侧菜单
            this.layout.isExpand = true;
        },
        isFullscreen() {
            return document.fullscreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement || false;
        }, handleUnlock() {
            
            this.$store.dispatch('UnlockSystem',this.unlockCheck).then(()=>{
                            console.log('解锁！！！');
                            console.log(this.isLock);
                            this.unlockCheck = '';
            });
        }

    }, watch: {
        'layout.isExpand': function () {
            let leftPosition = this.layout.isExpand ? 0 : -200;
            this.$refs.leftNav.$el.style.left = leftPosition + 'px';
            this.$refs.mainBody.style.marginLeft = leftPosition + 200 + 'px';
        },
        'layout.isFullScreen': function () {
            if (this.layout.isFullScreen) {
                this.requestFullScreen(document.getElementsByClassName('container')[0]);
            } else {
                this.exitFull();
            }
        },
        $route() {

            //容器滚动条还原到顶部
            this.$refs.mainBody.scrollTop = 0;
        }

    },
    mounted() {
        //无法监听到全屏状态下按F11或者Esc取消全屏，
        //通过window.onresize来判断处理
        //如果触发了onresize处于非全屏状态且 state全屏状态为true,则是非操作按钮退出的全屏，需修改状态
        let v = this;
        console.log('token-main:' + this.token);
        console.log(this.isLock + '+++++++++');
        window.onresize = function () {
            //console.log(v.isFullscreen());
            if (!v.isFullscreen() && v.layout.isFullScreen) {
                v.layout.isFullScreen = false;
            }
        }

    }
}
</script>
<style scoped>

</style>