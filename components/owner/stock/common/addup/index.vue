<template>
  <div class="addup-container">
    <div class="skeleton"/>
    <div class="fixed-inner">
      <div class="addup" @click="toggleSheet">
        <slot name="addup"/>
      </div>
      <div class="button">
        <slot name="button">
          <span>确认</span>
        </slot>
      </div>
    </div>
    <Sheet :shown.sync="sheetShown">
      <slot name="sheet"/>
    </Sheet>
  </div>
</template>

<script>
import Sheet from './Sheet'

export default {
  name: 'Addup',
  components: {
    Sheet
  },
  data() {
    return {
      sheetShown: false
    }
  },

  methods: {
    toggleSheet() {
      this.sheetShown = !this.sheetShown
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 60px;
.addup-container {
  position: relative;
  z-index: 9;
}
.skeleton {
  height: $height;
}
.fixed-inner {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  display: flex;
  width: 100%;
  height: $height;
  background-color: #fff;
  > .addup {
    flex: 1 0;
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 2px 1px 0px rgba(190, 190, 190, 0.5);
    > .item {
      width: 100%;
      padding: 0 10px;
    }
  }
  > .button {
    flex: 0 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #26a2ff;
    color: #fff;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
