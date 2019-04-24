<template>
  <div class="item">
    <div class="item--title">
      <span>{{ data.productName }}</span>
      <span>{{ data.productItemName }}</span>
    </div>
    <div class="item--amount">
      <span>{{ data.allocationQty || 0 }}</span>
      <span>{{ residue || 0 }}</span>
      <span>{{ data.count }}</span>
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
  },
  computed: {
    residue() {
      return this.data.allocationQty - this.data.count
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
