<template>
  <div class="loading">
    <mt-spinner type="fading-circle" :size="14"/>
    <span class="text">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'WmsLoading',
  props: {
    title: {
      type: String,
      default: '正在加载中'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}
</style>
