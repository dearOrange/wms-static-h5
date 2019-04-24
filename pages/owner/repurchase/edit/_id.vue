<template>
  <div>
    <Container/>
  </div>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'
import Container from '@/components/owner/repurchase/edit/Container'
export default {
  name: 'RepurchaseEdit',
  components: {
    Container
  },
  mixins: [clearPublicStore()]
}
</script>
