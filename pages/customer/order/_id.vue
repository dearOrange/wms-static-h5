<template>
  <div class="detail">
    <wms-header title="订单详情"/>
    <Container />
  </div>
</template>

<script>
import Container from '@/components/customer/order/detail/Container'

export default {
  name: 'Detail',
  components: {
    Container
  }
}
</script>
