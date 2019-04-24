<template>
  <div class="goods-num">
    <div class="num-item">
      <span class="name">数量（{{ data.measureUnitName }}）</span>
      <span>
        <wms-num-count v-model="count"/>
      </span>
    </div>
    <div class="num-item">
      <span class="name">单价</span>
      <span class="value">{{ unitPrice | CNY }}</span>
    </div>
    <div class="num-item">
      <span class="name">金额</span>
      <span class="value">{{ (count * unitPrice) | CNY }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'GoodsNum',

  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: this.data.count
    }
  },

  computed: {
    unitPrice() {
      return this.data.perUnitPrice
    }
  },

  watch: {
    count: {
      handler(newCount) {
        this.updateCount({
          id: this.data.productItemUkid,
          data: this.data,
          count: newCount
        })
      }
    }
  },

  methods: {
    ...mapMutations({
      updateCount: 'cart/update'
    })
  }
}
</script>

<style lang="scss" scoped>
.goods-num {
  display: flex;
  > .num-item {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      margin-bottom: 5px;
    }
    .value {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
