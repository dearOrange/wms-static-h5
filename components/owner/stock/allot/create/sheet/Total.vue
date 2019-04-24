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
  </div>
</template>

<script>
import { sumBy } from 'lodash'
export default {
  name: 'OrderSheetTotal',
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
      return sumBy(this.list, item => item.count || 0)
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
