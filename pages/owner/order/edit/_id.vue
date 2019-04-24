<template>
  <Container/>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'
import Container from '@/components/owner/order/edit/Container'
export default {
  name: 'OrderEdit',
  components: {
    Container
  },
  mixins: [clearPublicStore()]
}
</script>
