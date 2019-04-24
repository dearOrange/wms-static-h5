<template>
  <Box>
    <template slot="hd">
      <GoodsTitle :list="list"/>
    </template>
    <div slot="bd">
      <template v-for="(item, index) in list">
        <wms-whitespace v-if="index !== 0" :key="'sep' + item.orderDetailUkid" size="5" bgcolor="rgba(0,0,0,.15)" style="margin: 15px 0;" />
        <GoodsItem :key="`item_${item.orderDetailUkid}`" :data="item">
          <GoodsNum :data="item"/>
        </GoodsItem>
      </template>
    </div>
  </Box>
</template>

<script>
import Box from '@/components/share/Box'
import GoodsItem from '@/components/share/GoodsItem'
import GoodsTitle from './GoodsTitle'
import GoodsNum from './GoodsNum'

export default {
  name: 'Goods',
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
  }
}
</script>
