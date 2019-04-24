<template>
  <section>
    <wms-header title="填写单位信息" />

    <div class="join">
      <div>
        <wms-field
          v-model="params.bizUnit.fullName"
          v-validate="'required'"
          data-vv-name="fullName"
          title="单位名称*"
          placeholder="请输入单位名称"
        />
        <span v-show="errors.has('fullName')" class="is-danger">请输入单位名称</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      </div>
      <div>
        <wms-field
          v-model="params.bizUnit.shortName"
          v-validate="'required'"
          data-vv-name="shortName"
          title="单位简称"
          placeholder="请输入简称"
        />
        <span v-show="errors.has('shortName')" class="is-danger">请输入简称</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      </div>
      <div>
        <wms-district
          v-model="district"
          v-validate="'required'"
          data-vv-name="district"
        />
        <span v-show="errors.has('district')" class="is-danger">请选择地区</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      </div>
      <div>
        <wms-field
          v-model="params.address.address"
          v-validate="'required'"
          data-vv-name="address"
          title="地址*"
          placeholder="请输入地址"
        />
        <span v-show="errors.has('address')" class="is-danger">请输入地址</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      </div>
      <div>
        <wms-field v-model.trim="params.address.contactName" title="联系人" placeholder="请输入联系人"/>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      </div>
      <div>
        <wms-field
          v-model.trim="params.address.mobile"
          v-validate="'phone'"
          data-vv-name="phone"
          title="手机号"
          type="tel"
          placeholder="请输入手机号"
        />
        <span v-show="errors.has('phone')" class="is-danger">{{ errors.first('phone')}}</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      </div>
      <div class="add">
        <mt-button type="primary" size="large" @click="goAdd">保 存</mt-button>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchList } from '@/api/owner/profile'
import { join } from '@/api/subscribe'

export default {
  name: 'Join',
  data() {
    return {
      district: [],
      params: {
        bizUnit: {
          fullName: '',
          shortName: ''
        },
        address: {
          provinceCode: '',
          cityCode: '',
          districtCode: '',
          address: '',
          contactName: '',
          mobile: ''
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let { success, data } = await fetchList()
      if (success) {
        this.params.address.mobile = data.mobileNumber
        this.params.address.contactName = data.userName
        console.log(data)
      }
    },
    goAdd() {
      this.$validator.validate().then(async result => {
        if (result) {
          let [provinceCode, cityCode, districtCode] = this.district
          this.params.address.provinceCode = provinceCode
          this.params.address.cityCode = cityCode
          this.params.address.districtCode = districtCode

          let { success } = await join(this.params)
          if (success) {
            console.log('add')
            this.$router.replace('/subscribe')
          } else {
            console.log('add error')
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

.join {
  padding: 15px;

  .add {
    text-align: center;
    margin-top: 18px;
  }
}
</style>
