<template>
  <div class="item">
    <div class="item--title">
      <span>{{ data.productName }}</span>
      <span>{{ data.productItemName }}</span>
    </div>
    <div class="item--amount">
      <span>{{ data.returnQty }}</span>
      <span>{{ data.unitPrice }}</span>
      <span>{{ data.refundAmount }}</span>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
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
