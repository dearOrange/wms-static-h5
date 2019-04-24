<template>
  <div class="detail">
    <wms-header title="采购退货订单详情"/>
    <Container />
  </div>
</template>

<script>
import Container from '@/components/owner/repurchase/detail/Container'

export default {
  name: 'RepurchaseDetail',
  components: {
    Container
  }
}
</script>
