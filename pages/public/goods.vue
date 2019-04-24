<template>
  <section class="goods">
    <wms-header title="选择商品" />
    <Container />
  </section>
</template>

<script>
import Container from '@/components/public/goods/Container'

export default {
  name: 'PublicGoods',
  components: {
    Container
  },
  data() {
    return {
      list: []
    }
  }
}
</script>
