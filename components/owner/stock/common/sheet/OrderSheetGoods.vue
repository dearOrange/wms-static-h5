<template>
  <div class="goods">
    <div class="goods--title">
      <span>{{ item.productName }}</span>
      <span>{{ item.productItemName }}</span>
    </div>
    <div class="goods--amount">
      <span>{{ item.measureUnitName }}</span>
      <span>{{ item.perUnitCost | CNY }}</span>
      <span>{{ item.sum | CNY }}</span>
      <!-- 当 购单状态为部分收货或者全部收货 显示 -->
      <!-- <span>5</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSheetGoods',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    sum() {
      return this.item.adjustQty * this.item.perUnitCost
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  // padding: 0 10px;
  > .goods--title {
    display: flex;
    margin-bottom: 10px;
    > span {
      margin-left: 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  > .goods--amount {
    display: flex;
    justify-content: center;
    > span {
      flex: 1 0;
      text-align: center;
    }
  }
}
</style>
