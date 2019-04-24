<template>
  <div class="app">
    <nuxt />
    <OwnerTabbar :key="key"/>
  </div>
</template>

<script>
import OwnerTabbar from '@/components/owner/Tabbar'

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
