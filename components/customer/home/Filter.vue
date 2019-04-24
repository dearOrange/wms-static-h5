<template>
  <BulletContainer class="filters">
    <CategoryBullet v-model="filter.categoryUkid" />
    <Bullet v-model="filter.priceSwitch" label="价格" :content="1"/>
    <Bullet v-model="filter.nameSwitch" label="商品名称" :content="1"/>
  </BulletContainer>
</template>

<script>
import BulletContainer from '@/components/share/filter/BulletContainer'
import Bullet from '@/components/share/filter/Bullet'
import CategoryBullet from './CategoryBullet'
export default {
  name: 'HomeFilter',
  components: {
    BulletContainer,
    Bullet,
    CategoryBullet
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
