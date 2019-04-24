<template>
  <div class="remark">
    <Box title="备注">
      <div slot="bd" class="remark--content">
        <mt-field v-model="data.remark" placeholder="请输入备注" type="textarea" rows="4"/>
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
.remark--content {
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
