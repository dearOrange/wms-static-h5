<template>
  <div class="app">
    <nuxt />
    <OwnerTabbar :key="key"/>
  </div>
</template>

<script>
import OwnerTabbar from '@/components/customer/Tabbar'

export default {
  name: 'TabbarLayout',
  components: {
    OwnerTabbar
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
