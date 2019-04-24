<template>
  <Box class="discounted" title="优惠金额">
    <template slot="bd">{{ data.reduceAmount || 0 }} 元</template>
  </Box>
</template>

<script>
import Box from './Box'

export default {
  name: 'Remark',
  components: {
    Box
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
