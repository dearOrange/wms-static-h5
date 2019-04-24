<template>
  <span class="option" :class="optionClass" @click="select">
    <i />
    <slot />
  </span>
</template>
<script>
import { split, isEmpty } from 'lodash'

export default {
  name: 'RadioOption',

  props: {
    value: [String, Number],

    themes: {
      type: String,
      default: ''
    }
  },

  computed: {
    optionClass() {
      let themes = isEmpty(this.themes) ? [] : split(this.themes, ' ')
      let themesClasses = themes.reduce((acc, theme) => {
        return {
          ...acc,
          [`option__${theme}`]: true
        }
      }, {})
      return {
        ...themesClasses,
        [`option__active`]: !!this.isActive
      }
    },
    isActive() {
      let { value } = this.$parent
      return value === this.value
    }
  },

  methods: {
    select() {
      let emitChangeValue

      if (!this.isActive) {
        emitChangeValue = this.value
        this.$parent.$emit('change', emitChangeValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  padding: 0;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
  & > i {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    width: 14px;
    border: 1px solid #eee;
    border-radius: 50%;
    margin-right: 5px;
  }
}
.option__active {
  & > i {
    border-color: #26a2ff;
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: #26a2ff;
      border-radius: 50%;
    }
  }
}
</style>
