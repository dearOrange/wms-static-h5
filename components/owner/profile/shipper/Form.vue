<template>
  <form class="form">
    <wms-field
      v-model="owner.ownerName"
      v-validate="'required'"
      data-vv-name="ownerName"
      title="货主名称*"
      placeholder="请输入货主名称"
    />
    <span v-show="errors.has('ownerName')" class="is-danger">请输入货主名称</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="address.contactName"
      v-validate="'required'"
      data-vv-name="contactName"
      title="联系人*"
      placeholder="请输入联系人"
    />
    <span v-show="errors.has('contactName')" class="is-danger">请输入联系人</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="address.mobile"
      v-validate="'required|phone'"
      data-vv-name="phone"
      title="联系电话*"
      placeholder="请输入联系电话"
      type="tel"
    />
    <span v-show="errors.has('phone')" class="is-danger">请输入联系电话</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-district v-model="district" v-validate="'required'" data-vv-name="username" color/>
    <span v-show="errors.has('username')" class="is-danger">请选择省市区</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="address.address"
      v-validate="'required'"
      data-vv-name="address"
      title="地址*"
      placeholder="请输入地址"
    />
    <span v-show="errors.has('address')" class="is-danger">请输入地址</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <mt-checklist
      title="消息通知用户"
      v-model="notifyUserIds"
      :options="notifyUserOptions"
      class="checklist"
    ></mt-checklist>

    <Confirm @confirm="confirm"/>
  </form>
</template>

<script>
import { fetchOwner, editOwner, getUserList } from '@/api/owner/profile'
import { MessageBox } from 'mint-ui'
import Confirm from './Confirm'

export default {
  name: 'Form',
  components: {
    Confirm
  },
  data() {
    return {
      address: {},
      owner: {
        notifyUserIds: ''
      },
      district: [],
      notifyUserOptions: [],
      notifyUserIds: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    confirm() {
      this.$validator.validate().then(async result => {
        if (result) {
          let [provinceCode, cityCode, districtCode] = this.district
          let owner = this.owner
          owner.notifyUserIds = this.notifyUserIds.join(',')

          let address = {
            ...this.address,
            provinceCode,
            cityCode,
            districtCode
          }
          let { success, msg } = await editOwner({
            address,
            owner
          })
          if (success) {
            MessageBox.alert('编辑成功').then(action => {
              this.$router.push('/owner/profile')
            })
          } else {
            MessageBox({
              title: '提示',
              message: msg || '编辑失败',
              showCancelButton: true
            })
          }
        }
      })
    },
    async init() {
      let {
        success,
        data: { address, owner }
      } = await fetchOwner()
      if (success) {
        if (address.provinceCode && address.cityCode && address.districtCode) {
          this.district = [
            address.provinceCode,
            address.cityCode,
            address.districtCode
          ]
        } else {
          this.district = []
        }

        this.address = address
        this.owner = owner
        if (owner.notifyUserIds !== null && owner.notifyUserIds !== undefined) {
          this.notifyUserIds = owner.notifyUserIds.split(',')
        }

        let { success: userSuccess, data: userList } = await getUserList({
          status: 1
        })
        if (userSuccess) {
          for (let index in userList) {
            this.notifyUserOptions.push({
              label: userList[index].userName,
              value: userList[index].userId
            })
          }
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

.form {
  /deep/ .cell {
    height: 42px;
  }

  .checklist {
    /deep/ .mint-checkbox-label {
      font-size: 14px;
    }
    /deep/ label {
      font-size: 14px !important;
    }
  }
}
</style>
