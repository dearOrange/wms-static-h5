<template>
  <span class="checkbox" :class="checkboxClass" @click="change">
    <i />
    <slot />
  </span>
</template>
<script>
import { split, isEmpty } from 'lodash'

export default {
  name: 'WmsCheckbox',

  props: {
    value: [String, Number],
    themes: {
      type: String,
      default: ''
    },
    initChecked: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      checked: this.initChecked
    }
  },

  computed: {
    checkboxClass() {
      let themes = isEmpty(this.themes) ? [] : split(this.themes, ' ')
      let themesClasses = themes.reduce((acc, theme) => {
        return {
          ...acc,
          [`checkbox__${theme}`]: true
        }
      }, {})
      return {
        ...themesClasses,
        [`checkbox__active`]: !!this.checked
      }
    }
  },

  watch: {
    initChecked(newChecked) {
      this.checked = newChecked
    }
  },

  methods: {
    change() {
      this.checked = !this.checked
      this.$emit('change', this.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #26a2ff;
.checkbox {
  display: flex;
  align-items: center;
  padding: 0;
  height: 24px;
  border-radius: 2px;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  & > i {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    width: 14px;
    border: 1px solid #d1d1d1;
  }
}

.checkbox__active {
  & > i {
    border-color: $color;
    background-color: $color;
    &:before {
      content: '';
      width: 8px;
      height: 6px;
      border-style: solid;
      border-width: 2px;
      border-color: transparent transparent #fff #fff;
      transform: translate3d(0, -2px, 0) rotate3d(0, 0, 1, -45deg);
      transform-origin: 50% 50%;
    }
  }
}
</style>
