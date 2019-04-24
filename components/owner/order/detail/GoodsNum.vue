<template>
  <div class="goods-num">
    <div class="num-item">
      <span class="name">数量（{{ data.measureUnitName }}）</span>
      <span class="value">{{ data.orderQty }}</span>
    </div>
    <div class="num-item">
      <span class="name">单价</span>
      <span class="value">{{ data.saleUnitPrice }}</span>
    </div>
    <div class="num-item">
      <span class="name">金额</span>
      <span class="value">{{ data.saleAmount }}</span>
    </div>
    <div v-if="isConfirm" class="num-item">
      <span class="name">已发货数</span>
      <span class="value">{{ data.shippedQty }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsNum',

  props: {
    isConfirm: {
      type: Boolean
    },
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
