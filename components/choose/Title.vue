<template>
  <div class="title">
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  &::before,
  &::after {
    content: '';
    flex: 1 100%;
    height: 1px;
    background-color: #e0e0e0;
  }
  > .text {
    flex-shrink: 0;
    display: inline-block;
    padding: 10px 15px;
    background: #fff;
    font-size: 14px;
  }
}
</style>
