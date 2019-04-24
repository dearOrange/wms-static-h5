<template>
  <Box class="discounted" title="优惠金额">
    <template slot="bd">
      <mt-field v-model="data.reduceAmount" label="" placeholder="请输入优惠金额" />
    </template>
  </Box>
</template>

<script>
import Box from '@/components/share/Box'

export default {
  name: 'Discounted',
  components: {
    Box
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.discounted {
  /deep/ .mint-field {
    background: none;
  }
  /deep/ .mint-cell-wrapper {
    padding: 0;
    font-size: 14px;
    background: none;
    /deep/ textarea {
      padding: 0;
      font-size: 14px;
      resize: none;
    }
  }
}
</style>
