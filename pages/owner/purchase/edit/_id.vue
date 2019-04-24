<template>
  <div>
    <Container/>
  </div>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'
import Container from '@/components/owner/purchase/edit/Container'
export default {
  name: 'PurchaseEdit',
  components: {
    Container
  },
  mixins: [clearPublicStore()]
}
</script>
