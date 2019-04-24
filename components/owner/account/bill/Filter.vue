<template>
  <BulletContainer class="filters">
    <SortBullet v-model="filter.billType"/>
    <StockBullet v-model="filter.date"/>
  </BulletContainer>
</template>

<script>
import BulletContainer from '@/components/share/filter/BulletContainer'
import SortBullet from './SortBullet'
import StockBullet from './StockBullet'
export default {
  name: 'WareFilter',
  components: {
    BulletContainer,
    SortBullet,
    StockBullet
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
