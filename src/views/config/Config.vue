<template>
  <Row>
    <Col class="left" span="24">
    <Tabs v-model="tabActived" type="card" @on-click="tabHandle">
      <Tab-pane label="站点设置" name="site">
        <Form  :label-width="100">
          <Form-item label="站点名称">
            <Input v-model="configs.SITE_NAME.value"></Input>
          </Form-item>
          <Form-item label="站点域名">
            <Input v-model="configs.SITE_DOMAIN.value"></Input>
          </Form-item>
          <Form-item label="站点LOGO">
            <croppa :width="configs.SITE_LOGO_W.value" 
            :height="configs.SITE_LOGO_H.value" 
            v-model="logoCroppa" 
            initial-size="cover" :quality="1" 
            accept=".jpeg,.png" placeholder="上传图片"
             :placeholder-font-size="20" :show-remove-button="true"
              :initial-image="configs.SITE_LOGO.value+'?t='+new Date().getTime()"
               :prevent-white-space="true"></croppa>
            <div class="right-control">
              <Slider :max="240" :min="30" v-model="configs.SITE_LOGO_W.value"  show-input></Slider>
              <Slider :max="120" :min="30" style="margin-top: 30px;" v-model="configs.SITE_LOGO_H.value" number show-input></Slider>
            </div>
          </Form-item>
          <Form-item label="站点状态">
            <i-switch v-model="configs.SITE_ON.value" size="large">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
          </Form-item>
          <Form-item v-if="!configs.SITE_ON.value" label="站点提示">
            <Input v-model="configs.SITE_OFF_MSG.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="postConfig(1)">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </Form-item>
        </Form>
      </Tab-pane>
      <Tab-pane label="会员设置" name="member">标签二的内容</Tab-pane>
      <Tab-pane label="SEO设置" name="seo">
        <Form :label-width="100">
          <Form-item label="站点标题 ">
            <Input v-model="configs.SITE_TITLE.value"></Input>
          </Form-item>
          <Form-item label="站点关键词 ">
            <Input v-model="configs.SITE_KEYWORDS.value"></Input>
          </Form-item>
          <Form-item label="站点描述">
            <Input v-model="configs.SITE_DESCRIPTION.value" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Form-item>
  
          <hr style="border: solid 1px #f3f3f3;">
          <Form-item label="友情链接" style="padding-bottom:80px;">
            <div class="link-header-control">
              <Button-group>
                <Button type="primary" @click="addLink">
                  新增链接
                  <Icon type="plus-round"></Icon>
                </Button>
              </Button-group>
            </div>
            <Row class-name="link-header">
              <Col span="1">ID</Col>
              <Col span="4">名称</Col>
              <Col span="6">链接</Col>
              <Col span="4">缩略图</Col>
              <Col span="2">状态</Col>
              <Col span="2">分组</Col>
              <Col span="2">排序</Col>
              <Col span="2">操作</Col>
            </Row>
            <Row class-name="link-item" :gutter="10" v-for="(link,index) in friendsLink" :key="index">
              <Col span="1">
              <span class="info">{{link.id?link.id:'#'}}</span>
              </Col>
              <Col span="4">
              <Input v-model="link.name"></Input>
              </Col>
              <Col span="6">
              <Input v-model="link.link"></Input>
              </Col>
              <Col span="4">
              <croppa class="link-croppa" :width="120" :height="60" v-model="link.temp" placeholder="上传图片" :quality="1" accept=".jpeg,.png" placeholder-color="#FFF" @image-remove="removeImg(link)" :placeholder-font-size="20" :show-remove-button="true" :initial-image="link.img"></croppa>
              </Col>
              <Col span="2">
              <i-switch v-model="link.status" size="large">
                <span slot="open">显示</span>
                <span slot="close">隐藏</span>
              </i-switch>
              </Col>
              <Col span="2">
              <Select v-model="link.groupId">
                <Option v-for="(g,i) in  3" :value="g" :key="i">{{'分组'+g}}</Option>
              </Select>
              </Col>
              <Col span="2">
              <Input-number :max="99" :min="1" v-model="link.sort"></Input-number>
              </Col>
              <Col span="2">
              <Button-group size="small">
                <Button v-if="!link.id" type="ghost" icon="plus" @click="postLink(link)">添加</Button>
                <Button v-else type="ghost" icon="checkmark" @click="updateLink(link)">更改</Button>
                <Button type="ghost" icon="close-round" @click="delLink(link)">删除</Button>
              </Button-group>
              </Col>
            </Row>
          </Form-item>
          <hr style="border: solid 1px #f3f3f3;">
        </Form>
  
      </Tab-pane>
      <Button type="ghost" icon="refresh" slot="extra">刷新</Button>
    </Tabs>
    </Col>
  </Row>
</template>
<script>
import 'vue-croppa/dist/vue-croppa.css';
import { getAllLinks, addLink, updateLink, deleteLink, uploadLinkImg } from '@/api/model/link';
import { getAllConfigs, updateConfigs } from '@/api/model/config';
export default {
  beforeCreate() {
    getAllConfigs().then(res => {
     
      if (!res.object) {
        this.$Notice.error({ title: '配置加载出错！！' });
      } else {
        //重构config
        res.object.forEach(c => {
          this.configs[c.name] = c;
        });
        // console.log('-------------');
        console.log(this.configs);
      }
    }).catch(error => {
      this.$Notice.error({ title: '配置加载出错！！' });
    });
  },
  data() {
    return {
      configs: {
        SITE_NAME: {
          value: ''
        },
        SITE_DOMAIN: {
          value: ''
        },
        SITE_LOGO: {
          value: '',
          temp:{}
        },
        SITE_LOGO_W: {
          value: 120
        },
        SITE_LOGO_H: {
          value: 60
        },
        SITE_ON: {
          value: false
        },
        SITE_OFF_MSG: {
          value: ''
        },
        SITE_TITLE: {
          value: ''
        },
        SITE_KEYWORDS: {
          value: ''
        },
        SITE_DESCRIPTION: {
          value: ''
        }
      },
      logoCroppa:{},
      tabActived: 'site',
      friendsLink: []
    }
  },
  computed: {

  },
  methods: {
    postConfig(flag){
        //组装数据
      let data=[];
      if(flag==1&&this.logoCroppa.hasImage()){
        //先更新logo
       this.configs.SITE_LOGO.value= this.logoCroppa.generateDataUrl('image/jpeg', 0.8);
      }
      for(let config in this.configs){
        if(flag==this.configs[config].groupId){
          data.push(this.configs[config]); 
        }
      }
      updateConfigs(data).then(res=>{
        this.$Notice.success({title:"配置保存成功!"});
      }).catch(error=>{
         this.$Notice.error({title:"配置保存失败!"});
      });
    },
    removeImg(link) {
      link.img = '';
    },
    tabHandle() {
      if (this.tabActived == "seo" && this.friendsLink.length == 0) {
        this.initLinkData();
      }
    },
    initLinkData() {
      getAllLinks().then(res => {
        res.object.forEach(v => { v.status = !!v.status });
        this.friendsLink = res.object;
      }).catch(error => {
        this.$Message.error('友情链接加载失败 。。');
      });
    },
    getAllLinks() {
      return getAllLinks();
    },
    uploadLinkImg(link) {
      link.temp.generateBlob((blob) => {
        if (blob) {
          let formData = new FormData();
          formData.append('id', link.id);
          formData.append('linkImg', blob);
          uploadLinkImg(formData).then(res => {
            link.img = res.object.url;
          }).catch(error => {
            this.$Message.error('图片上传 失败 ');
          })
        }
      }, 'image/jpeg', 1);
    },
    updateLink(link) {
      updateLink(link).then(res => {
        this.uploadLinkImg(link);
        this.$Notice.success({
          title: '链接更新成功！'
        })
      }).catch(error => {
        this.$Modal.error({
          width: 240,
          title: '操作失败',
          content: '<p>' + error + '</p>'
        });
      });
    },
    postLink(link) {
      if ($.trim(link.name) == "" || $.trim(link.link) == "") {
        this.$Message.error("链接名称和链接不能为空!");
        return false;
      }
      else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(link.link)) {
        this.$Message.error("链接格式错误!");
      }
      else {
        addLink(link).then((res) => {
          //更新ID为返回ID
          link.id = res.object;
          let index = this.friendsLink.findIndex(l => l.index == link.index);
          //用set更新数组 
          this.$set(this.friendsLink, index, link);
          //上传图片
          this.uploadLinkImg(link);
          this.$Notice.success({
            title: '链接添加成功！'
          })
        }).catch(error => {
          this.$Notice.error({
            title: '新增失败!'
          });
        });
      }
    },
    addLink() {
      this.friendsLink.push({
        name: '', link: '',
        img: '', status: true, groupId: 1, sort: 1, index: Symbol()
      });
    }, delLink(link) {
      if (link.id) {
        let _this = this;
        this.$Modal.confirm({
          title: '删除链接',
          content: '确定删除【' + link.name + '】?',
          width: 250,
          onOk() {
            deleteLink(link.id).then(res => {
              let index = _this.friendsLink.indexOf(link);
              _this.friendsLink.splice(index, 1);
              this.$Notice.success({
                title: '链接已删除！'
              })
            }).catch(error => {
              this.$Notice.error({
                title: '删除失败!'
              });
            });
          }
        });
      } else {
        let index = this.friendsLink.findIndex(l => l.index == link.index);
        this.friendsLink.splice(index, 1);
      }
    }
  }, computed: {

  }, mounted() {

  }, watch: {
    'configs.SITE_ON.value'(val) {
        if(typeof val==='string')
        this.configs.SITE_ON.value= (val=='true');
    },
    'configs.SITE_LOGO_W.value'(val) {
      this.configs.SITE_LOGO_W.value = Number(val);
    },
    'configs.SITE_LOGO_H.value'(val) {
      this.configs.SITE_LOGO_H.value = Number(val);
    }
  }
}
</script>
<style scoped>
.link-header-control {
  text-align: right;
  border-bottom: solid 1px #dedede;
}

.link-header {
  text-align: center;
  background: #57a3f3;
  color: #fff;
}

.link-item {
  margin-top: 10px;
  text-align: center;
}

.right-control {
  display: inline-block;
  margin-left: 20px;
  width: 480px;
}
</style>
