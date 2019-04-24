<template>
  <div class="bullet-container">
    <div v-show="shown" class="mask" @click="close"/>
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script>
import Bullet from '@/components/share/filter/Bullet'
export default {
  name: 'BulletContainer',
  data() {
    return {
      shown: false
    }
  },

  methods: {
    showMask() {
      this.shown = true
    },
    hideMask() {
      this.shown = false
    },
    close() {
      this.children().forEach(comp => {
        comp.hide()
      })
    },
    children() {
      let children = this.$children
      return children.map(child => {
        let targetChild
        while (child) {
          if (child.$options.name === Bullet.name) {
            targetChild = child
            break
          } else {
            child = child.$children[0]
          }
        }
        return targetChild
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bulletContainerHeight: 50px;
.bullet-container {
  position: relative;
  height: $bulletContainerHeight;
  .inner {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: $bulletContainerHeight;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    /deep/ .bullet {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
  }
}
</style>
