<template>
  <Box>
    <template slot="hd">
      <GoodsTitle :list="list"/>
    </template>
    <template slot="bd">
      <template v-for="(item, index) in list">
        <wms-whitespace v-if="index !== 0" :key="'sep' + item.productItemUkid" size="5" bgcolor="rgba(0,0,0,.15)" style="margin: 15px 0;" />
        <GoodsItem :key="`item_${item.productItemUkid}`" :data="item">
          <GoodsNum :data="item" @update="$emit('count', $event)"/>
        </GoodsItem>
      </template>
    </template>
  </Box>
</template>

<script>
import { sumBy } from '@/utils'

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
.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
