<template>
  <div class="goods-num">
    <div class="num-item">
      <span class="name">计划数</span>
      <span class="value">{{ data.purchaseQty }}</span>
    </div>
    <div class="num-item">
      <span class="name">剩余数</span>
      <span class="value">{{ remainCount }}</span>
    </div>
    <div class="num-item">
      <span class="name">本次收货</span>
      <span class="current">
        <wms-num-count v-model="count" :max="maxCount" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsNum',

  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: this.data.purchaseQty - this.data.receivedQty
    }
  },

  computed: {
    maxCount() {
      return this.data.purchaseQty - this.data.receivedQty
    },
    remainCount() {
      return this.maxCount - this.count
    }
  },

  watch: {
    count: {
      handler(newValue) {
        this.$emit('update', {
          ...this.data,
          count: newValue
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-num {
  display: flex;
  > .num-item {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      margin-bottom: 5px;
    }
    .value {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
