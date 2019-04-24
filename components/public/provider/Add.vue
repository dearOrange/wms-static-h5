<template>
  <div class="add">
    <div class="add--inner">
      <mt-button type="primary" size="small" plain>新增</mt-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$height: 42px;

.add {
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
