<template>
  <div>
    <div v-if="dataStatus === 300 || dataStatus === 600" class="item">
      <div class="item--title">
        <span>{{ data.productName }}</span>
        <span>{{ data.productItemName }}</span>
      </div>
      <div class="item--amount">
        <span>{{ data.count }}</span>
        <span>{{ data.shippedQty }}</span>
        <span>{{ dataStatus === 300 ? 0 : data.receiveQty }}</span>
      </div>
    </div>
    <div v-else class="item">
      <div class="item--title">
        <span>{{ data.productName }}</span>
        <span>{{ data.productItemName }}</span>
      </div>
      <div class="item--amount">
        <span>{{ data.count }}</span>
        <span>{{ data.perUnitCost | CNY }}</span>
        <span>{{ data.count * data.perUnitCost | CNY }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SheetItem',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    dataStatus: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  // padding: 0 10px;
  > .item--title {
    display: flex;
    margin-bottom: 10px;
    > span {
      margin-left: 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  > .item--amount {
    display: flex;
    justify-content: center;
    > span {
      flex: 1 0;
      text-align: center;
    }
  }
}
</style>
