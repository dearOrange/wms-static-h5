<template>
  <form class="form">
    <wms-field v-model="data.customerName" title="客户名称" readonly placeholder="请输入客户名称"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="data.contactName"
      v-validate="'required'"
      data-vv-name="contactName"
      title="联系人*"
      placeholder="请输入联系人"
    />
    <span v-show="errors.has('contactName')" class="is-danger">请输入联系人</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="data.mobile"
      v-validate="'required|phone'"
      data-vv-name="phone"
      title="联系电话*"
      placeholder="请输入联系电话"
      type="tel"
    />
    <span v-show="errors.has('phone')" class="is-danger">请输入联系电话</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-district v-model="district" v-validate="'required'" data-vv-name="username"/>
    <span v-show="errors.has('username')" class="is-danger">请选择省市区</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="data.address"
      v-validate="'required'"
      data-vv-name="address"
      title="地址*"
      placeholder="请输入地址"
    />
    <span v-show="errors.has('address')" class="is-danger">请输入地址</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>

    <Confirm @confirm="confirm"/>
  </form>
</template>

<script>
import { getAddress, updateAddress } from '@/api/customer/profile'

import Confirm from './Confirm'

export default {
  name: 'Form',
  components: {
    Confirm
  },
  data() {
    return {
      data: {},
      district: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let { data } = this.$route.params
      if (data) {
        this.data = data
        this.initDistrict(data)
      } else {
        this.fetch()
      }
    },
    initDistrict(data) {
      this.district = [data.provinceCode, data.cityCode, data.districtCode]
    },
    async fetch() {
      let {
        success,
        data: { address, customerName }
      } = await getAddress()
      if (success) {
        this.initDistrict(address)
        this.data = {
          customerName: customerName,
          ...address
        }
      }
    },
    confirm() {
      this.$validator.validate().then(async result => {
        if (result) {
          let [provinceCode, cityCode, districtCode] = this.district
          let address = {
            ...this.data,
            provinceCode,
            cityCode,
            districtCode
          }
          let { success } = await updateAddress(address)
          if (success) {
            this.$router.go(-1)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.is-danger {
  color: #f00;
  padding: 0 10px 10px;
}

.form {
  /deep/ .cell {
    height: 42px;
  }
}
</style>
