<template>
  <div>
    <wms-header title="关于农链万家"/>
    <div class="about_box">
      <wms-whitespace size="70"/>
      <div class="about_logo">
        <img src="/images/logo.jpg" alt="logo">
        <span>农链万家</span>
      </div>
      <wms-whitespace size="70"/>
      <div
        class="about_label"
      >1号冷链“农链万家”系统，是一套有效提高农产品供应链管理效率的便捷工具，对农产品采购、销售订单处理、应收应付、物流仓储等各个环节可以实现精准控制和数据统一，满足农产品流通中上下游合作企业关于销售、结算、物流等高效协作的需求。</div>
      <div class="about_bottom">北京酷领科信息技术有限公司版权所有</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.about_box {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .about_logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
    > span {
      padding: 10px 0;
      font-weight: 900;
    }
  }
  > .about_label {
    text-indent: 2em;
    color: #8c8a8a;
  }
  > .about_bottom {
    position: absolute;
    bottom: 6px;
    color: #8c8a8a;
  }
}
</style>
