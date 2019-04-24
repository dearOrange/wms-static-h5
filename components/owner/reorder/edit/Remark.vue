<template>
  <Box class="remark" title="备注">
    <template slot="bd">
      <mt-field v-model="data.remark" placeholder="请输入备注" type="textarea" rows="4" />
    </template>
  </Box>
</template>

<script>
import Box from '@/components/share/Box'

export default {
  name: 'Remark',
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
.remark {
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
