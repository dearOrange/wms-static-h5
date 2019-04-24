<template>
  <div class="goods">
    <div class="goods--title">
      <span>{{ data.productName }}</span>
      <span>{{ data.productItemName }}</span>
    </div>
    <div class="goods--amount">
      <span>{{ data.count }}</span>
      <span>{{ data.unitPrice | CNY }}</span>
      <span>{{ data.count * data.unitPrice | CNY }}</span>
      <!-- 当 购单状态为部分收货或者全部收货 显示 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'SheetGoods',
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
    }
  }
}
</style>
