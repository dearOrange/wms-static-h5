<template>
  <div class="whitespace" :style="styles" />
</template>

<script>
export default {
  name: 'WmsWhitespace',
  props: {
    size: {
      type: [String, Number],
      default: 0
    },

    direction: {
      type: String,
      default: 'vertical',
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      }
    },
    bgcolor: {
      type: String,
      default: 'transparent'
    }
  },

  computed: {
    isHor() {
      return this.direction === 'horizontal'
    },

    styles() {
      return {
        [this.isHor ? 'width' : 'height']: `${this.size}px`,
        display: this.isHor ? 'inline-block' : 'block',
        backgroundColor: this.bgcolor
      }
    }
  }
}
</script>
