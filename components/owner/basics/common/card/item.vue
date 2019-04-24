<template>
  <div class="product--price--item">
    <p>{{ title }}</p>
    <p>
      <span v-if="created" @click="decreate">-</span>
      <span class="span--item">{{ productNum }}</span>
      <span v-if="created" @click="increate">+</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    created: {
      type: Boolean,
      default: false
    },
    title: String,
    productNum: String
  },
  methods: {
    decreate() {},
    increate() {}
  }
}
</script>

<style lang="scss" scoped>
.product--price--item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .span--item {
    color: #f00;
  }
}
</style>
