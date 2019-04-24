<template>
  <ul class="tabs__box">
    <li v-for="item in filters" :key="item.type" @click="select(item.type)">
      <span class="arrow-desc">{{ item.label }}</span>
      <span :class="activeType === item.type ? 'arrow-up': 'arrow-down'" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filters: {
      type: Array,
      required: true
    },
    value: String,
    isTemplate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeType: this.value
    }
  },
  watch: {
    isTemplate: function(newVal, oldVal) {
      if (oldVal) {
        this.activeType = 'R'
      }
    }
  },
  methods: {
    select(type) {
      if (type === this.activeType) {
        return
      }
      this.activeType = type
      this.$emit('change', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs__box {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  & > li {
    margin: 0;
    flex: 1;
    padding: 10px 0;
    display: flex;
    &:nth-of-type(2) {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    & > .arrow-desc {
      flex: 1;
      text-align: center;
    }
    & .arrow-up {
      position: relative;
      top: -4px;
      left: -30px;
      &:before,
      &:after {
        position: absolute;
        content: '';
        border-top: 10px transparent dashed;
        border-left: 10px transparent dashed;
        border-right: 10px transparent dashed;
        border-bottom: 10px #fff solid;
      }
      &:before {
        border-bottom: 10px #ccc solid;
      }
      &:after {
        top: 1px; /*覆盖并错开1px*/
        border-bottom: 10px #fff solid;
      }
    }
    & .arrow-down {
      position: relative;
      top: 6px;
      left: -30px;
      &:before,
      &:after {
        position: absolute;
        content: '';
        border-bottom: 10px transparent dashed;
        border-left: 10px transparent dashed;
        border-right: 10px transparent dashed;
        border-top: 10px #fff solid;
      }
      &:before {
        border-top: 10px #ccc solid;
      }
      &:after {
        bottom: 1px; /*覆盖并错开1px*/
        border-top: 10px #fff solid;
      }
    }
  }
}
</style>
