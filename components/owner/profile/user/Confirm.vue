<template>
  <div class="confirm">
    <div class="confirm--inner" @click="confirm">
      <span>确定</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 42px;

.confirm {
  &::before {
    content: '';
    display: block;
    height: $height;
    width: 100%;
  }
  &--inner {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: $height;
    background-color: #26a2ff;
    color: #fff;
  }
}
</style>
