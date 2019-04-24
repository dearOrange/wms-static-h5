<template>
  <div class="detail">
    <wms-header title="商品详情"/>
    <Container />
  </div>
</template>

<script>
import Container from '@/components/customer/goods/detail/Container'

export default {
  name: 'Detail',
  components: {
    Container
  }
}
</script>
