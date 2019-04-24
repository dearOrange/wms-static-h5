<template>
  <dl class="goods--title">
    <dd>商品种类：<span class="num">{{ typeCount }}</span></dd>
    <dd>总数：<span class="num">{{ orderCount }}</span></dd>
  </dl>
</template>

<script>
import { sumBy } from '@/utils'

export default {
  name: 'GoodsTitle',

  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    typeCount() {
      return this.list.length
    },
    orderCount() {
      return sumBy(this.list, 'returnQty')
    }
  }
}
</script>

<style lang="scss" scoped>
dl.goods--title {
  display: flex;
  > dd {
    margin-left: 8px;
    .num {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
