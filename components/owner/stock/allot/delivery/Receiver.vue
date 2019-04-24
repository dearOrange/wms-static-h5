<template>
  <div class="receiver">
    <Box title="收货信息">
      <div slot="bd" class="receiver--content">
        <div class="personal">
          <span class="name">联系人：{{ data.receiverContactName }}</span>
          <span class="phone">联系电话：{{ data.receiverMobile }}</span>
        </div>
        <wms-whitespace size="20" />
        <div class="address">
          地址：{{ data.receiverProvince }}{{ data.receiverCity }}{{ data.receiverDistrict }}{{ data.receiverAddress }}
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/sales/common/Box'

export default {
  name: 'Receiver',
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
.receiver--content {
  padding: 10px 0;
}
.personal {
  > .name {
    margin-right: 15px;
  }
}
</style>
