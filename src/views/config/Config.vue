<template>
  <Row>
    <Col class="left" span="24">
    <Tabs type="card">
      <Tab-pane label="站点设置">
        <Form :model="form1" :label-width="100">
          <Form-item label="站点名称">
            <Input v-model="form1.siteName"></Input>
          </Form-item>
          <Form-item label="站点域名">
            <Input v-model="form1.domain"></Input>
          </Form-item>
          <Form-item label="站点LOGO">
  
          </Form-item>
          <Form-item label="站点图标">
          </Form-item>
          <Form-item label="站点状态">
            <i-switch v-model="form1.siteStatus" size="large">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
          </Form-item>
          <Form-item v-if="!form1.siteStatus" label="站点提示">
            <Input v-model="form1.closeMsg" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Form-item>
          <Form-item>
            <Button type="primary">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </Form-item>
        </Form>
      </Tab-pane>
      <Tab-pane label="会员设置">标签二的内容</Tab-pane>
      <Tab-pane label="SEO设置">
        <Form :model="form3" :label-width="100">
          <Form-item label="站点标题 ">
            <Input v-model="form3.siteTitle"></Input>
          </Form-item>
          <Form-item label="站点关键词 ">
            <Input v-model="form3.siteKeywords"></Input>
          </Form-item>
          <Form-item label="站点描述">
            <Input v-model="form3.siteDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Form-item>
  
          <hr style="border: solid 1px #f3f3f3;">
          <Form-item label="友情链接" style="padding-bottom:80px;">
  
            <Modal v-model="MaddLinkGroup" title="新增友情链接" @on-ok="addLink">
              <Form>
                <Form-item label="站点标题 ">
                  <Input></Input>
                </Form-item>
              </Form>
            </Modal>
            <div class="link-header-control">
              <Button-group>
                <Button type="primary" @click="MaddLinkGroup = true">
                  <Icon type="plus-round"></Icon>
                  新增分组
                </Button>
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
              <Col span="4">缩略图</Col>
              <Col span="2">
              <i-switch v-model="link.status" size="large">
                <span slot="open">显示</span>
                <span slot="close">隐藏</span>
              </i-switch>
              </Col>
              <Col span="2">
              <Select v-model="link.groupId">
                <Option v-for="(g,i) in  linkGroups" :value="g.id" :key="i">{{g.name}}</Option>
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
import { getAllLinks, updateLink, deleteLink } from '@/api/model/link';
export default {
  created() {
    getAllLinks().then(res => {
      if (res.code == 200) {
        res.object.forEach(v => { v.status = !!v.status });
        this.friendsLink = res.object;
      } else {
        this.$Message.error('友情链接加载失败 。。');
      }
    }).catch(error => {
      this.$Message.error('友情链接加载失败 。。');
    });
  },
  data() {
    return {
      MaddLinkGroup: false,
      form1: {
        siteName: '子牙建站',
        domain: 'www.ziyaweb.com',
        siteStatus: true,
        closeMsg: '网站维护中。。。。。',
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      form3: {
        siteTitle: '专业的建站公司',
        siteKeywords: '南宁建站,子牙建站,一流建站公司',
        siteDescription: '66666666666666666666666666666666'
      },
      friendsLink: [],
      linkGroups: [
        { id: 1, name: '首页友情链接' },
        { id: 2, name: '合作伙伴' },
        { id: 3, name: '战略合作伙伴' }]
    }
  },
  methods: {
    getAllLinks() {
      return getAllLinks();
    },
    updateLink(link) {
      updateLink(link).then(res => {
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
      console.log(service);
      //link.status = link.status?1:0;
      // this.$store.dispatch('AddLink',link).then(()=>{
      // }).catch(error=>{
      //   console.log(error);
      // });
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
    // friendsLinkData: function () {
    //   return this.friendsLink.forEach(v => { v.status = v.status == 1 })
    // }
  }, mounted() {

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
</style>
