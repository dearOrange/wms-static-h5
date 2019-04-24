<template>
  <div class="detail">
    <wms-header title="采购订单详情"/>
    <Container />
  </div>
</template>

<script>
import Container from '@/components/owner/purchase/detail/Container'

export default {
  name: 'PurchaseDetail',
  components: {
    Container
  }
}
</script>
