<template>
  <BulletContainer class="filters">
    <StockBullet v-model="filter.stockId"/>
    <SortBullet v-model="filter.date"/>
  </BulletContainer>
</template>

<script>
import BulletContainer from '@/components/share/filter/BulletContainer'
import StockBullet from './StockBullet'
import SortBullet from './SortBullet'
export default {
  name: 'WareFilter',
  components: {
    BulletContainer,
    StockBullet,
    SortBullet
  },
  props: {
    filter: {
      type: Object
    }
  },
  data() {
    return {
      value: '',
      type: ''
    }
  },

  watch: {
    type(newType) {
      console.log(newType)
    }
  }
}
</script>
