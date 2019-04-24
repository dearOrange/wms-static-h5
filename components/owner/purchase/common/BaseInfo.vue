<template>
  <div class="base-info">
    <wms-cell title="采购日期" :value="data.purchaseDate | date" />
    <wms-cell title="供应商" :value="data.supplierName" />
    <wms-cell title="仓库" :value="data.stockName" />
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
