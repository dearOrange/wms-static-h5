<template>
  <div class="create">
    <wms-header title="新增供应商信息">
      <template slot="right">
        <span @click="fetchAdd">保存</span>
      </template>
    </wms-header>
    <div class="sub--box">
      <sub class="sub">*</sub>
      <mt-field
        v-model.trim="params.supplier.supplierName"
        v-validate="'required'"
        data-vv-name="supplierName"
        label="名称"
        placeholder="请输入名称"
      />
      <span v-show="errors.has('supplierName')" class="is-danger">请输入名称</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
    <div class="border">
      <wms-district v-model="district"/>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    <div>
      <mt-field v-model.trim="params.address.address" label="详细地址" placeholder="请输入详细地址"/>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
    <mt-field v-model.trim="params.address.contactName" label="联系人" placeholder="请输入联系人"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    <div>
      <mt-field
        v-model.trim="params.address.mobile"
        v-validate="'phone'"
        data-vv-name="phone"
        label="手机号"
        type="tel"
        placeholder="请输入手机号"
      />
      <span v-show="errors.has('phone')" class="is-danger">{{ errors.first('phone') }}</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
    <div>
      <mt-cell title="状态" is-link>
        <mt-switch v-model="value"/>
      </mt-cell>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
  </div>
</template>

<script>
import { addList, getDetail, editList } from '@/api/base/provider'
import { MessageBox } from 'mint-ui'
export default {
  name: 'ProviderCreate',
  data() {
    return {
      value: true,
      district: [],
      params: {
        address: {
          provinceCode: '',
          cityCode: '',
          districtCode: '',
          address: '',
          mobile: '',
          contactName: ''
        },
        supplier: {
          supplierName: '',
          status: 1
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    fetchAdd() {
      this.$validator.validate().then(async result => {
        if (result) {
          let [provinceCode, cityCode, districtCode] = this.district
          this.params.address.provinceCode = provinceCode
          this.params.address.cityCode = cityCode
          this.params.address.districtCode = districtCode
          this.params.supplier.status = this.value ? 1 : 0
          if (this.$route.query.id) {
            let { success, msg } = await editList(this.params)
            if (success) {
              MessageBox.alert('编辑成功').then(action => {
                this.$router.push('/owner/basics/provider/list')
              })
            } else {
              MessageBox({
                title: '提示',
                message: msg || '编辑失败',
                showCancelButton: true
              })
            }
          } else {
            let { success, msg } = await addList(this.params)
            if (success) {
              MessageBox.alert('新增成功').then(action => {
                this.$router.push('/owner/basics/provider/list')
              })
            } else {
              MessageBox({
                title: '提示',
                message: msg || '新增失败',
                showCancelButton: true
              })
            }
          }
        }
      })
    },
    async getList() {
      if (this.$route.query.id) {
        let { success: success1, data: detailData } = await getDetail(
          this.$route.query.id
        )
        if (success1) {
          if (detailData.supplier.status === 1) {
            this.value = true
          } else {
            this.value = false
          }
          let address = detailData.address
          if (
            address.provinceCode &&
            address.cityCode &&
            address.districtCode
          ) {
            this.district = [
              address.provinceCode,
              address.cityCode,
              address.districtCode
            ]
          } else {
            this.district = []
          }

          this.params = detailData
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-danger {
  color: #f00;
  padding: 0 10px 10px;
}
.sub--box {
  position: relative;
}
.sub {
  position: absolute;
  color: #f00;
  top: 15px;
  left: 4px;
  z-index: 9;
}
.border {
  padding: 4px 0;
}
</style>

<style>
.mint-cell-text {
  font-size: 14px !important;
}
</style>
