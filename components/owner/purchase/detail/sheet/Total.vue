<template>
  <div class="total">
    <div class="item">
      <span class="title">商品数量</span>
      <span class="value">{{ orderCount }}</span>
    </div>
    <div v-if="isConfirm" class="item">
      <span class="title">已收货数</span>
      <span class="value">{{ receivedCount }}</span>
    </div>
    <div class="item">
      <span class="title">商品金额</span>
      <span class="value">{{ amountCount | CNY }}</span>
    </div>
    <div class="item">
      <span class="title">优惠金额</span>
      <span class="value">- {{ discount | CNY }}</span>
    </div>
    <div v-if="isConfirm" class="item">
      <span class="title">订单金额</span>
      <span class="value">{{ (amountCount - discount) | CNY }}</span>
    </div>
    <div v-else class="item">
      <span class="title">采购单金额</span>
      <span class="value">{{ (amountCount - discount) | CNY }}</span>
    </div>
  </div>
</template>

<script>
import { sumBy } from '@/utils'

export default {
  name: 'SheetTotal',

  props: {
    isConfirm: {
      type: Boolean
    },
    discount: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    orderCount() {
      return sumBy(this.list, 'purchaseQty')
    },
    receivedCount() {
      return sumBy(this.list, 'receivedQty')
    },
    amountCount() {
      return sumBy(
        this.list,
        this.isConfirm ? 'receivedAmount' : 'purchaseAmount'
      )
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
