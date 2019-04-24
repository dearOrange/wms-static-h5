<template>
  <nuxt-link :to="to" tag="div" class="icon-button">
    <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="'#icon-' + icon"></use>
    </svg>
    <p class="text">{{ text }}</p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'IconLink',
  props: {
    text: String,
    to: {
      type: String,
      default: '/'
    },
    icon: {
      type: String,
      default: 'caigoutuihuodan'
    }
  }
}
</script>

<style lang="scss" scope>
.icon-button {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .icon {
    width: 30px;
    height: 30px;
  }
  & > .text {
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>
