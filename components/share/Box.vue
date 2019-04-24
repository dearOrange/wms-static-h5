<template>
  <div class="box">
    <div
      class="hd"
    >
      <slot name="hd">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div
      class="bd"
      :class="{
        borderness: bdBorderness
      }"
    >
      <slot name="bd" />
    </div>
    <div class="ft">
      <slot name="ft" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    title: {
      type: String,
      default: ''
    },

    bdBorderness: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  > .hd {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 10px;
    background-color: #f1f1f1;
    box-shadow: 0 2px 5px 0px rgba(143, 143, 143, 0.5);
  }

  > .bd {
    padding: 10px;
    &.borderness {
      padding: 0;
    }
  }
}
</style>
