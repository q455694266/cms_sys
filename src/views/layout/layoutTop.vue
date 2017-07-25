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
                    <Button type="ghost" @click="clearCache">清除缓存</Button>
                    <Button type="ghost">计划任务</Button>
                    <Dropdown class="iuser" @on-click="handleIuser">
                        <a href="javascript:void(0)">
                            <Icon type="person" /> 超级管理员
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list" style="margin-top:-5px">
                            <Dropdown-item name="Set">
                                <Icon type="android-settings"></Icon>&nbsp&nbsp设置</Dropdown-item>
                            <Dropdown-item name="Lock">
                                <Icon type="android-lock"></Icon>&nbsp&nbsp锁屏</Dropdown-item>
                            <Dropdown-item divided name="Logout">
                                <Icon type="android-exit"></Icon>&nbsp&nbsp登出</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </Button-group>
    
                </Col>
                <Col class="top-left" span="6" pull="18">
                <Button-group>
                    <Button type="ghost" @click="handleExpand">
                        <Icon type="navicon" size="20" :class="expandActived"></Icon>
                    </Button>
                    <Button type="ghost" @click="handleFullscreen">
                        <Icon :type="minMaxIcon" size="20"></Icon>
                    </Button>
                    <Button type="ghost" @click="handlePrint">
                        <Icon type="ios-printer-outline" size="20"></Icon>
                    </Button>
                </Button-group>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import service from '../../util/fetch';
export default {
    computed: {
        ...mapGetters(['layout', 'isLock'])
    },
    data() {
        return {
            expandActived: '',
            minMaxIcon: 'arrow-expand',
            lockCheck: ''
        }
    }, methods: {
        handleExpand() {
            this.layout.isExpand = !this.layout.isExpand;
            this.expandActived = this.layout.isExpand ? '' : 'expandActived'
        },
        handleFullscreen() {
            this.layout.isFullScreen = !this.layout.isFullScreen;

        },
        PrintElem(elem) {
            var mywindow = window.open('打印窗口', '_blank');
            mywindow.document.write('<html><head><title>' + document.title + '</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write('<h1>' + document.title + '</h1>');
            mywindow.document.write(elem.innerHTML);
            mywindow.document.write('</body></html>');
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/
            mywindow.print();
            mywindow.close();
            return true;
        },
        handlePrint() {
            this.PrintElem(document.getElementsByClassName('layout-body')[0]);
        }, clearCache() {
            service.post("/api/test").then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
            });
        },
        handleIuser($n) {
            if ($n === 'Set') {
                //设置
            } else if ($n === 'Lock') {
                this.$Modal.confirm({
                    width: 280,
                    okText: '锁定',
                    title:'',
                    render: (h) => {
                        let inp = h('Input', {
                            props: {
                                value: this.lockCheck,
                                autofocus: true,
                                placeholder: '输入加锁密码...',
                                maxlength: 8,
                                icon: 'ios-locked-outline'
                            },
                            style: {
                                marginTop: '20px'
                            },
                            on: {
                                input: (val) => {
                                    val = val.replace(/\s+/g, '');
                                    this.lockCheck = val;
                                    console.log(this.lockCheck);
                                }
                            }
                        });
                        let header = h('Alert', {
                            props: {
                                type: 'warning',
                                'show-icon': true
                            },
                            style:{
                                fontSize:'20px'
                            }
                            // domProps: {
                            //     innerText: '锁定当前用户'
                            // }
                        },'锁定当前用户')
                        return h('div', {}, [ header,inp])

                    },
                    onOk: () => {
                       // console.log(this.lockCheck.length);
                         this.$store.dispatch('LockSystem').then(() => {
                             console.log('用户已锁定！');
                             console.log(this.isLock);
                         });
                    }
                });
                //锁屏
            } else {
                //登出
            }
            console.log($n);
        }
    }, mounted() {
        //console.log(this.$parent.$refs['lockCheck']);
    }, watch: {
        'layout.isFullScreen': function () {
            this.minMaxIcon = this.layout.isFullScreen ? 'arrow-shrink' : 'arrow-expand';
        }
    }

}
</script>
<style scoped>

</style>
