<template>
  <div class="base-info">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseInfo'
}
</script>
<style lang="scss" scoped>
.base-info {
  padding: 10px 0;
}
</style>
