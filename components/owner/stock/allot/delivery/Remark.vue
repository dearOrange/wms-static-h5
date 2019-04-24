<template>
  <div class="remark">
    <Box title="备注">
      <div v-if="data.allocationStatus === 100" slot="bd" class="remark--content">
        <mt-field v-model="data.remark" placeholder="请输入备注" type="textarea" rows="4"/>
      </div>
      <div v-else slot="bd" class="remark--content">{{ data.remark }}</div>
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
}
</style>
