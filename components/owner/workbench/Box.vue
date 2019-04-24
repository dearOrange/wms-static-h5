<template>
  <div class="box">
    <div class="box--title">
      <span class="text">{{ title }}</span>
    </div>
    <div class="box--content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 10px 0;
  background: #fff;
}

.box--title {
  padding: 10px 0;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  & > .text {
    font-size: 18px;
    margin-left: 20px;
    font-weight: 900;
  }
}

.box--content {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
