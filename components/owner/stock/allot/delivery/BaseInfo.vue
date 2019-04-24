<template>
  <div class="base-info">
    <wms-cell title="调整日期" :value="data.modifyTime | date"/>
    <wms-cell title="调出仓库" :value="data.fromStockName"/>
    <wms-cell title="调入仓库" :value="data.toStockName"/>
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
</style>
