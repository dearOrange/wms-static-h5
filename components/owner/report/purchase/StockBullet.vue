<template>
  <Bullet label="排序" :content="stockList" @change="onChange"/>
</template>

<script>
import Bullet from '@/components/share/filter/Bullet'
// import { wareList as getStockList } from '@/api/owner/stock'
export default {
  name: 'StockBullet',
  components: {
    Bullet
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      stockList: [
        {
          label: '采购数量从多到少',
          value: 'qtyDesc'
        },
        {
          label: '采购数量从少到多',
          value: 'qtyAsc'
        },
        {
          label: '采购金额从多到少',
          value: 'priceDesc'
        },
        {
          label: '采购金额从少到多',
          value: 'priceAsc'
        }
      ]
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
