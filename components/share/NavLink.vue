<template>
  <div class="navlink">
    <span class="title">{{ title }}</span>
    <div class="arrow" @click="onClick">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-rt-arrow" />
      </svg>
    </div>
  </div>
</template>
<script>
import { startsWith } from 'lodash'
export default {
  name: 'Navlink',
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: [String, Object]
    }
  },

  methods: {
    onClick() {
      if (this.to) {
        if (startsWith(this.to, 'http')) {
          window.location.href = this.to
        } else {
          this.$router.push(this.to)
        }
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navlink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 10px;
  > .title {
    flex: 1 100%;
  }
  > .arrow {
    > .icon {
      justify-self: flex-end;
      color: #999;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
