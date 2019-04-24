<template>
  <div class="total">
    <div class="item">
      <span class="title">计划数量</span>
      <span>{{ totalCount }}</span>
    </div>
    <div class="item">
      <span class="title">本次收货</span>
      <span>{{ currentReceivedCount }}</span>
    </div>
    <div class="item">
      <span class="title">剩余未收</span>
      <span>{{ totalCount - receivedCount - currentReceivedCount }}</span>
    </div>
  </div>
</template>

<script>
import { sumBy } from '@/utils'

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
    totalCount() {
      return sumBy(this.list, 'purchaseQty')
    },
    receivedCount() {
      return sumBy(this.list, 'receivedQty')
    },
    currentReceivedCount() {
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
