<template>
  <div>
    <div class="remark--box">
      <div>收货信息</div>
      <div class="profile--info">
        <span class="name">王小二</span>
        <span class="phone">18888888888</span>
      </div>
      <div>浙江省杭州市江干区新加坡科技园1号酷领科1号店</div>
    </div>
    <div class="remark--box remark">
      <span class="title">备注</span>
      <span class="content">因为存放时间比较久，一定要送最新鲜的食材，不然气温较高很容器坏掉，谢谢！</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Remark'
}
</script>

<style lang="scss" scoped>
.remark--box {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  & > .profile--info {
    display: flex;
    padding: 20px 0;
    & > .phone {
      flex: 1;
      text-align: center;
    }
  }
}
.remark {
  display: flex;
  & > .title {
    flex-shrink: 0;
  }
  & > .content {
    margin-left: 20px;
  }
}
</style>
