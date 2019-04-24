<template>
  <div class="option" :class="optionClass" @click="select">
    <slot />
  </div>
</template>
<script>
import { includes, remove, split, isEmpty } from 'lodash'

export default {
  name: 'Option',

  props: {
    value: String,

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
      let arr = value
      return includes(arr, String(this.value))
    }
  },

  methods: {
    select() {
      let { value: parentValue } = this.$parent
      let self = this
      let emitChangeValue
      let arr = [...parentValue]
      if (this.isActive) {
        remove(arr, item => {
          return item === String(self.value)
        })
      } else {
        arr.push(String(this.value))
      }
      emitChangeValue = arr
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
