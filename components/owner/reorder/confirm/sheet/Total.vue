<template>
  <div class="total">
    <div class="item">
      <span class="title">退货数量</span>
      <span>{{ totalCount }}</span>
    </div>
    <div class="item">
      <span class="title">退货金额</span>
      <span>{{ amountCount }}</span>
    </div>
  </div>
</template>

<script>
import { sumBy } from '@/utils'

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
    totalCount() {
      return sumBy(this.list, 'returnQty')
    },
    amountCount() {
      console.log(this.list)
      return sumBy(this.list, 'refundAmount')
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
