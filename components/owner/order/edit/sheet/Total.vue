<template>
  <div class="total">
    <div class="item">
      <span class="title">商品数量</span>
      <span class="value">{{ orderCount }}</span>
    </div>
    <div class="item">
      <span class="title">商品金额</span>
      <span class="value">{{ amountCount | CNY }}</span>
    </div>
    <div class="item">
      <span class="title">优惠金额</span>
      <span class="value">- {{ data.reduceAmount | CNY }}</span>
    </div>
    <div class="item">
      <span class="title">订单金额</span>
      <span class="value">{{ (amountCount - data.reduceAmount) | CNY }}</span>
    </div>
  </div>
</template>

<script>
import { sumBy } from 'lodash'

export default {
  name: 'SheetTotal',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    orderCount() {
      return sumBy(this.data.ordDetailList, item => item.orderQty)
    },
    amountCount() {
      return sumBy(this.data.ordDetailList, item => {
        return item.orderQty * item.unitPrice * this.data.discount
      })
    }
  }
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
