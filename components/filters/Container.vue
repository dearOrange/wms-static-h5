<template>
  <div class="filter-container">
    <div class="main-content">
      <slot/>
    </div>
    <div class="buttons">
      <span class="cancel" @click="$emit('cancel')">取消</span>
      <span class="confirm" @click="$emit('confirm')">确认</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterContainer'
}
</script>

<style lang="scss" scoped>
$buttonsHeight: 60px;

.filter-container {
  position: relative;
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding-bottom: $buttonsHeight;
}
.main-content {
  height: 100%;
  overflow-y: auto;
}
.buttons {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  height: $buttonsHeight;
  width: 100%;
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 auto;
    &.cancel {
      color: rgba(38, 162, 255, 1);
      // box-shadow: inset 0 0 2px 1px rgba(190, 190, 190, 0.5);
      background-color: rgba(38, 162, 255, 0.3);
    }
    &.confirm {
      background-color: rgba(38, 162, 255, 1);
      color: #fff;
    }
  }
}
</style>
