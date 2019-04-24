<template>
  <div class="discounted">
    <Box title="优惠金额">
      <div slot="bd" class="discounted--content">
        <mt-field v-model="data.reduceAmount" label placeholder="请输入优惠金额"/>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/owner/stock/common/Box'

export default {
  name: 'StockRemark',
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
.discounted--content {
  min-height: 50px;

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
