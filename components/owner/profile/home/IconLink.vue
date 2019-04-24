<template>
  <nuxt-link :to="to" tag="div" class="icon-link">
    <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="'#icon-' + icon"></use>
    </svg>
    <p class="text">{{ text }}</p>
    <mt-badge v-if="data" size="small" class="badge">{{ data }}</mt-badge>
  </nuxt-link>
</template>

<script>
export default {
  name: 'IconLink',
  props: {
    text: String,
    to: {
      type: Object
    },
    icon: {
      type: String
    },
    data: {
      type: [String, Number]
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
  position: relative;
  & > .icon {
    width: 30px;
    height: 30px;
  }
  & > .text {
    margin-top: 5px;
    font-size: 12px;
  }
  > .badge {
    position: absolute;
    top: -8px;
    right: 8px;
  }
}
</style>
