<template>
  <div>
    <div v-if="params === 'order'" class="order--box">
      <div class="item">
        <span>销售总数量</span>
        <span class="count">{{ data.qtySum || 0 }}</span>
      </div>
      <div class="item">
        <span>销售总金额</span>
        <span class="count">{{ data.amountSum | CNY }}</span>
      </div>
    </div>
    <div v-else class="order--box">
      <div class="item">
        <span>退货总数量</span>
        <span class="count">{{ data.qtySum || 0 }}</span>
      </div>
      <div class="item">
        <span>退货总金额</span>
        <span class="count">{{ data.amountSum | CNY }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddupSave',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    params: {
      type: String,
      default() {
        return 'return'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order--box {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-around;
  > .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    > .count {
      color: #f00;
    }
  }
}
</style>
