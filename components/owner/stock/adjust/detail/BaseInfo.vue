<template>
  <div class="base-info">
    <wms-cell title="调整日期" :value="data.auditTime | date"/>
    <wms-cell title="仓库" :value="data.stockName"/>
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
