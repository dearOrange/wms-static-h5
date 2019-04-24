<template>
  <div class="store__box">
    <div
      v-for="item in filters"
      :key="item.stockId"
      :class="{'item_active': activeType == item.stockId }"
      class="store_item"
      @click="selectItem(item.stockId)"
    >
      {{ item.stockName }}
    </div>
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
      type = type.toString()
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
