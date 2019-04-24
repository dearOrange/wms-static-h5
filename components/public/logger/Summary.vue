<template>
  <div class="summary">
    <div class="item">
      <span class="label">单号：</span>
      <span class="value">{{ $route.query.orderNo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  computed: {
    typeName() {
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  padding: 10px;
}
</style>
