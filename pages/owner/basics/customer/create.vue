<template>
  <div class="create">
    <wms-header title="客户资料">
      <template slot="right">
        <span @click="fetchAdd">保存</span>
      </template>
    </wms-header>
    <div class="sub--box">
      <sub class="sub">*</sub>
      <wms-field
        v-model.trim="params.customerName"
        v-validate="'required'"
        data-vv-name="customerName"
        title="名称"
        placeholder="请输入名称"
      />
      <span v-show="errors.has('customerName')" class="is-danger">请输入名称</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    </div>
    <div>
      <wms-field
        v-model.trim="params.ownerCustomer.discount"
        v-validate="'price'"
        data-vv-name="price"
        title="发货折扣"
        type="number"
        placeholder="请输入发货折扣"
      />
      <span v-show="errors.has('price')" class="is-danger">请输入正确的发货折扣</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    </div>
    <wms-district v-model="district"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div>
      <wms-field v-model.trim="params.address.address" title="详细地址" placeholder="请输入详细地址"/>
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
    <div style="padding: 5px 0;">
      <wms-cell title="状态">
        <mt-switch slot="value" v-model="value"/>
      </wms-cell>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div>
      <div style="padding: 5px 0;">
        <wms-cell title="账号信息">
          <template slot="value">
            <span
              v-if="params.syUser.userName || params.syUser.userAccount"
              style="color:#26a2ff"
              @click="clearAccount"
            >注销账号</span>
            <span v-else style="color:#26a2ff" @click="setAccount">生成账号</span>
          </template>
        </wms-cell>
      </div>
      <div v-if="params.syUser.userName || params.syUser.userAccount">
        <div class="desc">姓名：{{ params.syUser.userName }}</div>
        <div class="desc">用户名：{{ params.syUser.userAccount }}</div>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="mark">* 生成或注销账号后需要点击右上角保存才能生效哦</div>
    <template v-if="onSheet">
      <AddSheet :params="params.syUser" @change="cancelChange" @submit="submitOrder"/>
    </template>
  </div>
</template>

<script>
import AddSheet from '@/components/owner/basics/customer/list/addSheet'
import { MessageBox } from 'mint-ui'
import { addList, getDetail, editList } from '@/api/base/customer'

export default {
  name: 'ProviderCreate',
  components: {
    AddSheet
  },
  data() {
    return {
      onSheet: false,
      value: true,
      district: [],
      params: {
        customerName: '',
        status: 1,
        address: {
          provinceCode: '',
          cityCode: '',
          districtCode: '',
          address: '',
          mobile: '',
          contactName: ''
        },
        ownerCustomer: {
          discount: ''
        },
        syUser: {
          // password: '',
          userAccount: '',
          userName: ''
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
          this.params.status = this.value ? 1 : 0
          if (this.$route.query.id) {
            let { success, msg } = await editList(this.params)
            if (success) {
              MessageBox.alert('编辑成功').then(action => {
                this.$router.push('/owner/basics/customer/list')
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
                this.$router.push('/owner/basics/customer/list')
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
          if (detailData.status === 1) {
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

          this.params = { ...this.params, ...detailData }
        }
      }
    },
    setAccount() {
      if (!this.params.address.mobile || !this.params.address.contactName) {
        MessageBox('提示', '请先填写联系人和手机号！')
      } else {
        this.params.syUser = {
          // password: 'nlwj123456',
          userAccount: this.params.address.mobile,
          userName: this.params.address.contactName
        }
        this.onSheet = true
      }
    },
    clearAccount() {
      MessageBox.confirm('', {
        title: '注销客户账号',
        message: '注销后客户将无法登录系统',
        showCancelButton: true
      })
        .then(action => {
          if (action === 'confirm') {
            // 确认的回调
            this.params.logout = true
            this.params.syUser = {
              // password: '',
              userAccount: '',
              userName: ''
            }
          }
        })
        .catch(err => {
          if (err === 'cancel') {
            // 取消的回调
            this.params.logout = false
          }
        })
    },
    cancelChange() {
      this.params.syUser = {
        // password: '',
        userAccount: '',
        userName: ''
      }
      this.onSheet = false
    },
    submitOrder(val) {
      this.params.syUser = { ...this.params.syUser, ...val }
      this.onSheet = false
    }
  }
}
</script>
<style lang="scss" scoped>
.desc {
  width: 100%;
  padding: 0 10px 10px;
}
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
.border--padding {
  padding: 8px 0;
}
.mark {
  padding: 10px;
  color: #f00;
}
</style>

<style>
.mint-cell-text {
  font-size: 14px !important;
}
</style>
