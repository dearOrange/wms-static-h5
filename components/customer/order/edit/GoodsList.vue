<template>
  <Box>
    <template slot="hd">
      <GoodsTitle :list="data.ordDetailList"/>
    </template>
    <div slot="bd">
      <template v-if="isEmpty">
        <div class="empty">
          暂无商品信息, 请立刻
          <a @click="goChooseGoods">添加</a>
        </div>
      </template>
      <template v-else>
        <template v-for="(item, index) in list">
          <wms-whitespace
            v-if="index !== 0"
            :key="'sep' + item.productItemUkid"
            size="5"
            bgcolor="rgba(0,0,0,.15)"
            style="margin: 15px 0;"
          />
          <GoodsItem :key="`item_${item.productItemUkid}`" :data="item">
            <GoodsNum :data="item" :discount="data.discount"/>
          </GoodsItem>
        </template>
      </template>
    </div>
  </Box>
</template>

<script>
import { mapGetters } from 'vuex'

import Box from '@/components/share/Box'
import GoodsItem from '@/components/share/GoodsItem'
import GoodsTitle from './GoodsTitle'
import GoodsNum from './GoodsNum'

export default {
  name: 'GoodsList',
  components: {
    GoodsItem,
    GoodsTitle,
    GoodsNum,
    Box
  },

  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    ...mapGetters({
      list: 'public/goods'
    }),
    isEmpty() {
      return this.list.length === 0
    }
  },

  watch: {
    list: {
      immediate: true,
      handler(newList = []) {
        this.data.ordDetailList = newList.map(
          ({
            productItemUkid,
            productItemCode,
            count,
            measureUnit,
            unitPrice
          }) => {
            return {
              productItemUkid,
              productItemCode,
              measureUnit,
              orderQty: count,
              unitPrice
            }
          }
        )
      }
    }
  },

  methods: {
    goChooseGoods() {
      this.$router.push('/public/goods')
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
