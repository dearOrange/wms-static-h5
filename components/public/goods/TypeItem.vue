<template>
  <div class="type-item">
    <span class="title">
      {{ title }}
    </span>
    <span v-if="countGtZero" class="badge">
      {{ countText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TypeItem',

  props: {
    title: {
      type: String,
      required: true
    },

    count: {
      type: Number,
      default: 0
    }
  },

  computed: {
    countGtZero() {
      return this.count > 0
    },
    countGtMax() {
      const MAX = 99
      return this.count > MAX
    },
    countText() {
      return this.countGtMax ? '99+' : this.count
    }
  }
}
</script>

<style lang="scss" scoped>
.type-item {
  position: relative;
  padding: 15px 10px;
  > .title {
    font-size: 12px;
  }
  > .badge {
    position: absolute;
    right: 5px;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    background-color: red;
    color: #fff;
    border-radius: 50%;
    font-size: 10px;
  }
}
</style>
