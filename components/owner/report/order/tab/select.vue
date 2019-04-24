<template>
  <div class="select-box">
    <div class="select-options">
      <div>
        <slot name="SelectName" />
      </div>
      <div class="select-btns">
        <mt-button type="default" @click="cancel">取消</mt-button>
        <mt-button type="primary" @click="sure">确定</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  methods: {
    cancel() {
      this.$emit('close')
    },
    sure() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  width: 100%;
  //   height: 100vh;
  //   background: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  top: 89px;
  z-index: 90;
  & > .select-options {
    background: #fff;
  }
  & .select-btns {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
