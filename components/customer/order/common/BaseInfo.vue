<template>
  <div class="base-info">
    <wms-cell title="订单日期" :value="data.createTime | date" />
    <!-- <wms-cell title="客户" :value="data.customerName" />
    <wms-cell title="仓库" :value="data.stockName" /> -->
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  padding: 10px 0;
}
</style>
