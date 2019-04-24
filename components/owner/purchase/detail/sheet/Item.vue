<template>
  <div class="item">
    <div class="item--title">
      <span>{{ data.productName }}</span>
      <span>{{ data.productItemName }}</span>
    </div>
    <div class="item--amount">
      <span>{{ data.purchaseQty }}</span>
      <span>{{ data.purchaseUnitCost | CNY }}</span>
      <span>{{ data.purchaseAmount | CNY }}</span>
      <span v-if="isConfirm">{{ data.receivedQty }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SheetItem',
  props: {
    isConfirm: {
      type: Boolean
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  // padding: 0 10px;
  > .item--title {
    display: flex;
    margin-bottom: 5px;
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
