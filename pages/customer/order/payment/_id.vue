<template>
  <div>
    <wms-header title="订单付款"/>
    <Container/>
  </div>
</template>

<script>
import Container from '@/components/customer/order/payment/Container'

export default {
  name: 'OrderPay',
  components: {
    Container
  }
}
</script>
