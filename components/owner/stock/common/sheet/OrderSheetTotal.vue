<template>
  <div class="total">
    <div class="item">
      <span class="title">商品数量</span>
      <span class="value">25</span>
    </div>
    <div class="item">
      <span class="title">商品金额</span>
      <span class="value">¥ 1100.00</span>
    </div>
    <!-- <div class="item">
      <span class="title">采购单金额</span>
      <span class="value">¥ 1100.00</span>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'OrderSheetTotal'
}
</script>

<style lang="scss" scoped>
.total {
  > .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding: 0 10px;
    > .value {
      color: #888;
    }
  }
}
</style>
