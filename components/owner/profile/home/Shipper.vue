<template>
  <div class="shipper">
    <div class="name">{{ owner.ownerName }}</div>
    <wms-whitespace size="8"/>
    <div class="other">
      <div>联系人：{{ address.contactName }}</div>
      <div>联系电话 ：{{ address.mobile }}</div>
      <div>地址：{{address.province}}{{address.city}}{{address.district}}{{ address.address }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shipper',
  props: {
    owner: {
      type: Object
    },
    address: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.shipper {
  padding: 10px;
  line-height: 24px;
  > .other {
    display: flex;
    flex-direction: column;
  }
}
</style>
