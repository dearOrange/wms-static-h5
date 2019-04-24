<template>
  <Box class="remark" title="备注">
    <template slot="bd">
      <div class="content">
        {{ data.remark || '无备注' }}
      </div>
    </template>
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

<style lang="scss" scoped>
.remark {
  .content {
    min-height: 50px;
  }
}
</style>
