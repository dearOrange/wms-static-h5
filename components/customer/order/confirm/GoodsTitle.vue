<template>
  <div class="goods-title">
    <dl>
      <dd>商品种类：<span class="num">{{ typeCount }}</span></dd>
      <dd>计划数：<span class="num">{{ orderCount }}</span></dd>
    </dl>
  </div>
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
      return sumBy(this.list, 'orderQty')
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  > dl {
    flex: 1 auto;
    display: flex;
    > dd {
      margin-left: 8px;
      .num {
        color: red;
        font-weight: 700;
      }
    }
  }
}
</style>
