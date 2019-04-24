<template>
  <Bullet label="仓库" :content="stockList" @change="onChange"/>
</template>

<script>
import Bullet from '@/components/share/filter/Bullet'
import { wareList as getStockList } from '@/api/owner/stock'
import { concat } from 'lodash'
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
      stockList: []
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let { success, data } = await getStockList()
      if (success) {
        this.stockList = data.map(item => ({
          label: item.stockName,
          value: item.stockId
        }))
        this.stockList = concat({ label: '全部', value: '' }, this.stockList)
      }
    },

    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
