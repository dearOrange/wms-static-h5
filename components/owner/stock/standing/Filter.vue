<template>
  <BulletContainer class="filters">
    <CategoryBullet v-model="filter.categoryUkid"/>
    <StockBullet v-model="filter.stockId"/>
    <!-- <SortBullet v-model="filter.accordingSort"/> -->
  </BulletContainer>
</template>

<script>
import BulletContainer from '@/components/share/filter/BulletContainer'
import CategoryBullet from './CategoryBullet'
// import SortBullet from './SortBullet'
import StockBullet from './StockBullet'
export default {
  name: 'WareFilter',
  components: {
    BulletContainer,
    CategoryBullet,
    // SortBullet,
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
