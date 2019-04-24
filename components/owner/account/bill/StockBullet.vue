<template>
  <Bullet label="收/付款日期" :content="stockList" @change="onChange"/>
</template>

<script>
import Bullet from '@/components/share/filter/Bullet'
// import { wareList as getStockList } from '@/api/owner/stock'
// import { concat } from 'lodash'
export default {
  name: 'StockBullet',
  components: {
    Bullet
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      status: this.value,
      stockList: [
        // {
        //   label: '自定义',
        //   value: ''
        // },
        {
          label: '今天',
          value: 't'
        },
        {
          label: '昨天',
          value: 'y'
        },
        {
          label: '本月',
          value: 'tm'
        },
        {
          label: '上月',
          value: 'lm'
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
