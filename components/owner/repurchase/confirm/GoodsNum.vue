<template>
  <div class="goods-num">
    <div class="num-item">
      <span class="name">数量（{{ data.measureUnitName }}）</span>
      <span class="value">{{ data.backQty }}</span>
    </div>
    <div class="num-item">
      <span class="name">单价</span>
      <span class="value">{{ data.refundUnitCost }}</span>
    </div>
    <div class="num-item">
      <span class="name">金额</span>
      <span class="value">{{ data.refundAmount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsNum',

  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-num {
  display: flex;
  > .num-item {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      margin-bottom: 5px;
    }
    .value {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
