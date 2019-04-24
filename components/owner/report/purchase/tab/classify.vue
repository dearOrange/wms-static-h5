<template>
  <div class="store__box">
    <div
      v-for="item in filters"
      :key="item.categoryUkid"
      :class="{'item_active': activeType == item.categoryUkid }"
      class="store_item"
      @click="selectItem(item.categoryUkid)"
    >{{ item.categoryName }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectClassify',
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
      console.log(type)
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
