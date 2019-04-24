<template>
  <div class="filter-button" :class="{ active }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FilterButton',
  props: {
    active: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-button {
  padding: 6px 10px;
  border-radius: 4px;
  background-color: #e9e9e9;
  font-size: 12px;
  &.active {
    color: #26a2ff;
    background-color: rgba(38, 162, 255, 0.3);
  }
}
</style>
