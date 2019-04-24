<template>
  <div class="item">
    <div class="hd">
      {{ title }}
    </div>
    <div class="bd">
      <slot name="bd" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterItem',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  > .hd {
    margin-bottom: 8px;
    color: #999;
    font-size: 12px;
  }
}
</style>
