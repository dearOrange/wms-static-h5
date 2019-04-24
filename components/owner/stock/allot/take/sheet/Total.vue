<template>
  <div class="total">
    <div class="item">
      <span class="title">计划数量</span>
      <span class="value">{{ orderCount }}</span>
    </div>
    <div class="item">
      <span class="title">本次收货</span>
      <span class="value">{{ amountCount }}</span>
    </div>
    <div class="item">
      <span class="title">剩余未收</span>
      <span class="value">{{ residueCount }}</span>
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
    }
  },

  computed: {
    orderCount() {
      return sumBy(this.list, item => item.shippedQty || 0)
    },
    amountCount() {
      return sumBy(this.list, item => item.count || 0)
    },
    residueCount() {
      return this.orderCount - this.amountCount
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
