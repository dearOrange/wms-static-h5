<template>
  <div class="goods-title">
    <dl>
      <dd>商品种类：<span class="num">{{ typeCount }}</span></dd>
      <dd>总数：<span class="num">{{ orderCount }}</span></dd>
    </dl>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
    isEmpty() {
      return this.list.length === 0
    },
    typeCount() {
      return this.list.length
    },
    orderCount() {
      return sumBy(this.list, 'purchaseQty')
    }
  },
  methods: {
    ...mapMutations({
      clear: 'public/delGoods'
    }),
    goChooseGoods() {
      this.$router.push('/public/goods')
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
