<template>
  <div>
    <Navlink
      title="收货信息"
      :to="{
        name: 'customer-profile-shipper',
        params: {
          data
        }
      }"
    />
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="shipper">
      <div class="name">{{ data.customerName }}</div>
      <wms-whitespace size="8"/>
      <div class="other">
        <div>联系人：{{ data.contactName }}</div>
        <div>联系电话 ：{{ data.mobile }}</div>
        <div>地址：{{ pcdText }}{{ data.address }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddress } from '@/api/customer/profile'
import Navlink from '@/components/share/NavLink'
import { connectedName } from '@/utils/area'

export default {
  name: 'Shipper',
  components: {
    Navlink
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    // 省市区信息
    pcdText() {
      if (this.data.addressUkid) {
        return connectedName([
          this.data.provinceCode,
          this.data.cityCode,
          this.data.districtCode
        ])
      }
      return ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let { success, data } = await getAddress()
      if (success) {
        this.data = {
          customerName: data.customerName,
          ...data.address
        }
      }
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
