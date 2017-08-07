<template>
<div class="main">
  <Row :gutter="20">
    <Col span="12" class="col-count">
    <Row type="flex"  justify="start" align="middle">
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="ios-paper" size="128"></Icon>
        <!-- <Icon type="document" size="128"></Icon> -->
        <a class="item-title">文档</a>
      </Badge>
      <h3></h3>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="chatbox-working" size="128"></Icon>
        <a class="item-title">评论</a>
      </Badge>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="bag" size="128"></Icon>
        <a class="item-title">产品</a>
      </Badge>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="person-stalker" size="128"></Icon>
        <a class="item-title">会员</a>
      </Badge>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="ios-alarm" size="128"></Icon>
        <a class="item-title">任务</a>
      </Badge>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="ios-list-outline" size="128"></Icon>
        <a class="item-title">表单</a>
      </Badge>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="document" size="128"></Icon>
        <a class="item-title">模板</a>
      </Badge>
      </Col>
      <Col span="6">
      <Badge class="item-count" count="1000" overflow-count="99999999">
        <Icon type="ios-pulse-strong" size="128"></Icon>
        <a class="item-title">访问量</a>
      </Badge>
      </Col>
    </Row>
    </Col>
    <Col span="12" class="col-notice">
    <h2 class="col-item-title">系统公告</h2>
    <Collapse accordion>
      <Panel name="1">
        <div class="notice-title">
          <span>史蒂夫·乔布斯</span>
          <em class="post-date">2017-8-6</em>
        </div>
        <div slot="content">
          史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
          <Collapse accordion>
            <Panel name="1-1">
              <div class="notice-title">
                <span>iPhone</span>
              </div>
              <p slot="content">iPhone，是美国苹果公司研发的智能手机，它搭载iOS操作系统。第一代iPhone于2007年1月9日由苹果公司前首席执行官史蒂夫·乔布斯发布，并在2007年6月29日正式发售。</p>
            </Panel>
            <Panel name="1-2">
              <div class="notice-title">
                <span>iPad</span>
              </div>
              <p slot="content">iPad是由苹果公司于2010年开始发布的平板电脑系列，定位介于苹果的智能手机iPhone和笔记本电脑产品之间，（屏幕中有4个虚拟程序固定栏）与iPhone布局一样，提供浏览网站、收发电子邮件、观看电子书、播放音频或视频、玩游戏等功能。由英国出生的设计主管乔纳森·伊夫（Jonathan Ive）（有些翻译为 乔纳森·艾维）领导的团队设计的，这个圆滑、超薄的产品反映出了伊夫对德国天才设计师Dieter Rams的崇敬之情。</p>
            </Panel>
          </Collapse>
        </div>
      </Panel>
      <Panel name="2">
        <div class="notice-title">
          <span>斯蒂夫·盖瑞·沃兹尼亚克</span>
        </div>
  
        <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
      </Panel>
      <Panel name="3">
        <div class="notice-title">
          <span>乔纳森·伊夫</span>
        </div>
  
        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
      </Panel>
    </Collapse>
    </Col>
  </Row>
  <Row :gutter="20">
     <Col span="12">
    <h2 class="col-item-title">系统信息</h2>
    <Table border :columns="sysinfoColumns" :data="sysinfo"></Table>
  </Col>
    <Col span="12">
    <h2 class="col-item-title">登录日志</h2>
    <Table border :columns="sysloginColumns" :data="syslogin"></Table>
  </Col>
  </Row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      sysinfoColumns:[
                    {
                        title: '项',
                        key: 'name'
                    },
                    {
                        title: '值',
                        key: 'value'
                    }
                ],
      sysloginColumns:[{title:'IP地址',key:'ip'},{title:'登录时间',key:'logintime'}],
      sysinfo:[
                    {
                        name: '应用版本',
                        value:'V 1.0'
                    },
                    {
                        name: '操作系统',
                        value:'Linux'
                    },
                    {
                        name: 'JDK版本',
                        value:'1.8.0'
                    },
                    {
                        name: '内存使用',
                        value:'1024M / 4096M'
                    },
                    {
                        name: '系统启动时间',
                        value:'2017-8-6 18:55:36'
                    },
                    {
                        name: '在线用户',
                        value:'26'
                    }
                ],
                syslogin:[{
                  ip:'127.0.0.1',
                  logintime:'2017-8-7 01:07:55'
                },{
                  ip:'127.0.0.1',
                  logintime:'2017-8-7 01:07:55'
                },{
                  ip:'127.0.0.1',
                  logintime:'2017-8-7 01:07:55'
                },{
                  ip:'127.0.0.1',
                  logintime:'2017-8-7 01:07:55'
                },{
                  ip:'127.0.0.1',
                  logintime:'2017-8-7 01:07:55'
                },{
                  ip:'127.0.0.1',
                  logintime:'2017-8-7 01:07:55'
                }]

    }
  }
}
</script>
<style>
.col-item-title{
  color: #5AA5F3;
  padding: 5px;
}
.col-count {
  border: solid 1px #D5E8FC;
  padding: 20px 0;
}

.item-count {
  margin: 20px 30px 0px 30px;
}

.item-count .ivu-icon {
  color: #D5E8FC;
}

.item-title {
  text-align: center;
  font-size: 36px;
  margin-top: 10px;
  display: block;
  color: #495060;
}

.item-count .ivu-badge-count {
  background: #2d8cf0;
}

.ivu-collapse {
  background: #FFF;
  border: solid 1px #D5E8FC;
}

.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  background: #FFF;
}

.ivu-collapse>.ivu-collapse-item {
  border-top: 1px solid #d5e8fc;
}

.notice-title {
  color: #333333;
  padding-left: 5px;
  font-size: 16px;
  display: inline;
}

.notice-title .post-date {
  float: right;
  margin-right: 15px;
  color: #5AA5F3;
}
</style>
