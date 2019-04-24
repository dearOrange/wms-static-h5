<template>
  <Container/>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'
import Container from '@/components/owner/reorder/edit/Container'
export default {
  name: 'ReorderEdit',
  components: {
    Container
  },
  mixins: [clearPublicStore()]
}
</script>
