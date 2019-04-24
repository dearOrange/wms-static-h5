<template>
  <div class="info">
    <div class="name">{{ data.productName }}</div>
    <div class="desc">
      <span>{{ data.productItemName }}</span>
    </div>
    <div class="unit">
      <span class="price">{{ data.perUnitPrice | CNY }}/{{ data.measureUnitName }}</span>
      <wms-num-count v-model="count" :min="1"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'
export default {
  name: 'Info',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      count: 1
    }
  },
  computed: {
    ...mapGetters({
      storedCarts: 'cart/list'
    })
  },
  watch: {
    count: {
      handler(newCount) {
        this.$emit('countChange', newCount)
      },
      immediate: true
    }
  },
  mounted() {
    let foundItem = find(
      this.storedCarts,
      item => item.id === this.data.productItemUkid
    )
    if (foundItem) {
      this.count = foundItem.count
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  .unit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .price {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
