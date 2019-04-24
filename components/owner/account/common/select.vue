<template>
  <div class="selected_box">
    <div
      v-for="item in list"
      :key="item.type"
      :class="{'item_active': activeType === item.type }"
      @click="selectItem(item.type)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      activeType: this.value
    }
  },
  watch: {},
  methods: {
    selectItem(type) {
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
.selected_box {
  display: flex;
  & > div {
    padding: 10px;
    background: #e8e8e8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
  }
  & > .item_active {
    color: #26a2ff;
    background: rgba(38, 162, 255, 0.3);
  }
}
</style>
