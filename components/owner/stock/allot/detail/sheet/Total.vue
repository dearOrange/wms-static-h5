<template>
  <div>
    <div v-if="dataStatus === 300 || dataStatus === 600" class="total">
      <div class="item">
        <span class="title">计划数量</span>
        <span class="value">{{ count }}</span>
      </div>
      <div class="item">
        <span class="title">调出数量</span>
        <span class="value">{{ orderCount }}</span>
      </div>
      <div class="item">
        <span class="title">调入数量</span>
        <span class="value">{{ dataStatus === 300 ? 0 : receiveCount }}</span>
      </div>
    </div>
    <div v-else class="total">
      <div class="item">
        <span class="title">商品数量</span>
        <span class="value">{{ count }}</span>
      </div>
      <div class="item">
        <span class="title">商品金额</span>
        <span class="value">{{ amountCount | CNY }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sumBy } from 'lodash'

export default {
  name: 'SheetTotal',

  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    dataStatus: {
      type: Number
    }
  },

  computed: {
    count() {
      return sumBy(this.list, item => item.count || 0)
    },
    orderCount() {
      return sumBy(this.list, item => item.shippedQty || 0)
    },
    receiveCount() {
      return sumBy(this.list, item => item.receiveQty || 0)
    },
    amountCount() {
      return sumBy(this.list, item => item.count * item.perUnitCost || 0)
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
