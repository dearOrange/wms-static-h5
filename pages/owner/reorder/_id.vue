<template>
  <div class="detail">
    <wms-header title="销售订单详情"/>
    <Container />
  </div>
</template>

<script>
import Container from '@/components/owner/reorder/detail/Container'

export default {
  name: 'Detail',
  components: {
    Container
  }
}
</script>
