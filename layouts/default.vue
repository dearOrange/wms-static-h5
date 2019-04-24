<template>
  <div class="app">
    <nuxt
      keep-alive
      :keep-alive-props="{
        include: [
          'PurchaseEdit',
          'RepurchaseEdit',
          'OrderEdit',
          'ReorderEdit',
          'AllotCreate',
          'AdjustCreate',
          'CustomerOrderEdit'
        ]
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'WmsLayout',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
