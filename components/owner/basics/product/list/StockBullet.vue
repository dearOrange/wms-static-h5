<template>
  <Bullet label="状态" :content="stockList" @change="onChange"/>
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
          label: '全部',
          value: ''
        },
        {
          label: '启用',
          value: '1'
        },
        {
          label: '停用',
          value: '0'
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
