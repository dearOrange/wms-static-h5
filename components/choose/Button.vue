<template>
  <div class="button" @click="onClick">
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
