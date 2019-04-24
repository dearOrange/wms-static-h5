<template>
  <nuxt-link :to="to" tag="div" class="icon-link">
    <img class="icon" src="https://via.placeholder.com/24">
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
    }
  }
}
</script>

<style lang="scss" scope>
.icon-link {
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
