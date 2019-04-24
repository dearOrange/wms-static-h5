<template>
  <div class="total">
    <div class="item">
      <span class="title">计划数量</span>
      <span>{{ totalCount }}</span>
    </div>
    <div class="item">
      <span class="title">本次发货</span>
      <span>{{ currentShippedCount }}</span>
    </div>
    <div class="item">
      <span class="title">剩余未发</span>
      <span>{{ totalCount - shippedCount - currentShippedCount }}</span>
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
      return sumBy(this.list, 'orderQty')
    },
    shippedCount() {
      return sumBy(this.list, 'shippedQty')
    },
    currentShippedCount() {
      return sumBy(this.list, 'count')
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
