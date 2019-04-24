<template>
  <div class="store__box">
    <div
      v-for="item in filters"
      :key="item.type"
      :class="{'item_active': activeType === item.type }"
      class="store_item"
      @click="selectItem(item.type)"
    >{{ item.label }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectStore',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    filters: {
      type: Array
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
  methods: {
    selectItem(type) {
      if (type === '') {
        return
      }
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
.store__box {
  width: 100%;
  & > .store_item {
    padding: 10px 30px;
  }
  & > .store_active {
    background: #ccc;
  }
}
.item_active {
  background: #ccc;
}
</style>
