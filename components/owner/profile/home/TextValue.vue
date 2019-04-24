<template>
  <nuxt-link :to="'/' + name" tag="div" class="text--value">
    <p class="text--icon" />
    <p class="text--content">{{ content }}</p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'TextValue',
  props: {
    content: String,
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scope>
.text--value {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  & > .text--icon {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
  }
  & > .text--content {
    font-size: 16px;
    margin-top: 6px;
  }
}
</style>
