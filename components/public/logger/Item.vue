<template>
  <div class="item" :class="{'newest': newest}">
    <div>操作人员：{{ data.userName }}</div>
    <wms-whitespace size="5"/>
    <div>操作时间：{{ data.operationTime | date('YYYY-MM-DD HH:mm:ss') }}</div>
    <wms-whitespace size="5"/>
    <div>操作方式：{{ data.operationName }}</div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      required: true
    },
    newest: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  color: #999;
  &.newest {
    color: #333;
  }
}
</style>
