<template>
  <Box>
    <template slot="hd">
      <GoodsTitle :list="list"/>
    </template>
    <div slot="bd">
      <template v-for="(item, index) in list">
        <wms-whitespace v-if="index !== 0" :key="'sep' + item.purchaseDetailUkid" size="5" bgcolor="rgba(0,0,0,.15)" style="margin: 15px 0;" />
        <GoodsItem :key="`item_${item.purchaseDetailUkid}`" :data="item">
          <GoodsNum :data="item" :is-confirm="isConfirm"/>
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
    isConfirm: {
      type: Boolean
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
