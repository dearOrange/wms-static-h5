<template>
  <div class="option" :class="optionClass" @click="select">
    <slot />
  </div>
</template>
<script>
import { split, isEmpty } from 'lodash'

export default {
  name: 'WmsSingleOption',

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
      } else {
        emitChangeValue = ''
      }
      this.$parent.$emit('change', emitChangeValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  padding: 0;
  border-radius: 2px;
  cursor: pointer;
}
</style>
