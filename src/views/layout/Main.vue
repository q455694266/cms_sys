<template>
  <Row>
    <Col span="12" class="col-count">
    <Row type="flex" :gutter="20" justify="start" align="middle">
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
    <Col span="8">
    </Col>
  </Row>
</template>
<script>
export default {

}
</script>
<style>
.col-count {
  border: solid 1px rgba(45, 140, 240, .2);
  padding: 20px 0;
}

.item-count {
  margin: 20px 30px 0px 30px;
}
.item-count .ivu-icon{
  color: #D5E8FC;
}
.item-title {
  text-align: center;
  font-size: 36px;
  margin-top: 10px;
  display: block;
  color: #495060;
}
.item-count .ivu-badge-count{
  background: #2d8cf0;
}
</style>
