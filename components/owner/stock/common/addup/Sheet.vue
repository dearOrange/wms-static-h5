<template>
  <div v-if="shown" class="order-sheet">
    <div class="layer" @click="hide" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
// import OrderSheetGoods from './OrderSheetGoods'
// import OrderSheetTotal from './OrderSheetTotal'

export default {
  name: 'AddupSheet',
  components: {
    // OrderSheetGoods,
    // OrderSheetTotal
  },
  props: {
    shown: {
      type: Boolean
    }
  },
  methods: {
    hide() {
      this.$emit('update:shown', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-sheet {
  position: relative;
  z-index: 8;
  > .layer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.15);
  }
  > .content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 60px;
    background: #fff;
    box-shadow: inset 0px 1px 3px 0px rgba(126, 126, 126, 0.53);
  }
}
.sheet--hd {
  display: flex;
  justify-content: center;
  padding: 10px;
  > span {
    flex: 1 0;
  }
}
.sheet--bd {
  padding: 12px 0;
  > .list {
    padding: 0 10px;
  }
}
</style>
