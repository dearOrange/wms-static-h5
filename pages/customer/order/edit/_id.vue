<template>
  <Container/>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'
import Container from '@/components/customer/order/edit/Container'
export default {
  name: 'CustomerOrderEdit',
  components: {
    Container
  },
  mixins: [clearPublicStore()]
}
</script>
