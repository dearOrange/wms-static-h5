<template>
  <BulletContainer class="filters">
    <CategoryBullet v-model="filter.categoryUkid"/>
    <SortBullet v-model="filter.saleStatus"/>
    <StockBullet v-model="filter.status"/>
  </BulletContainer>
</template>

<script>
import BulletContainer from '@/components/share/filter/BulletContainer'
import CategoryBullet from './CategoryBullet'
import StockBullet from './StockBullet'
import SortBullet from './SortBullet'
export default {
  name: 'WareFilter',
  components: {
    BulletContainer,
    CategoryBullet,
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
