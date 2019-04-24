<template>
  <div>
    <wms-header title="商城二维码">
      <template slot="right">
        <span>分享</span>
      </template>
    </wms-header>
    <div class="QR_box">
      <wms-whitespace size="70"/>
      <div class="QR_title">农链万家</div>
      <wms-whitespace size="70"/>
      <div class="QR_label">货主名称名称名称</div>
      <wms-whitespace size="30"/>
      <div class="QR_content">
        <img src alt="二维码">
        <span>扫码下单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QRCode'
}
</script>

<style lang="scss" scoped>
.QR_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .QR_title,
  .QR_label {
    font-size: 18px;
    font-weight: 900;
  }
  > .QR_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    > img {
      width: 130px;
      height: 130px;
      border: 1px solid #ccc;
    }
    > span {
      padding: 10px 0;
    }
  }
}
</style>
