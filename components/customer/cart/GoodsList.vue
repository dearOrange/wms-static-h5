<template>
  <div class="list">
    <template v-if="isEmpty">
      <div class="empty">
        暂无商品信息
      </div>
    </template>
    <template v-else>
      <template v-for="(item) in list">
        <GoodsItem :key="`item_${item.productItemUkid}`" :data="item">
          <GoodsNum :data="item" />
        </GoodsItem>
        <wms-whitespace
          :key="'sep_' + item.productItemUkid"
          size="5"
          bgcolor="rgba(0,0,0,.15)"
          style="margin: 15px 0;"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GoodsItem from '@/components/share/GoodsItem'
import GoodsNum from './GoodsNum'

export default {
  name: 'GoodsList',
  components: {
    GoodsItem,
    GoodsNum
  },
  computed: {
    ...mapGetters({
      list: 'cart/goodsList'
    }),
    isEmpty() {
      return this.list.length === 0
    }
  },

  watch: {
    // list(newList = []) {
    //   this.data.ordDetailList = newList.map(
    //     ({
    //       productItemUkid,
    //       productItemCode,
    //       count,
    //       measureUnit,
    //       unitPrice
    //     }) => {
    //       return {
    //         productItemUkid,
    //         productItemCode,
    //         measureUnit,
    //         orderQty: count,
    //         unitPrice
    //       }
    //     }
    //   )
    // }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 10px;
}
.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
