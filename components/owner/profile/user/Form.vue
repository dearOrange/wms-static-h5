<template>
  <form class="form">
    <wms-field
      v-model="data.userName"
      v-validate="'required'"
      data-vv-name="username"
      title="姓名*"
      placeholder="请输入姓名"
    />
    <span v-show="errors.has('username')" class="is-danger">请输入姓名</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="data.mobileNumber"
      v-validate="'required|phone'"
      data-vv-name="phone"
      title="手机*"
      placeholder="请输入手机"
    />
    <span v-show="errors.has('phone')" class="is-danger">请输入手机号</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field v-model="data.userAccount" title="登录账号" placeholder="请输入登录账号" type="tel" :readonly="true"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field v-model="data.fullName" title="公司名称" :readonly="true" placeholder="请输入公司名称"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="data.email"
      v-validate="'email'"
      data-vv-name="email"
      title="邮箱"
      placeholder="请输入邮箱"
    />
    <span v-show="errors.has('email')" class="is-danger">请输入正确的邮箱</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>

    <Confirm @confirm="confirm"/>
  </form>
</template>

<script>
import { fetchEdit, fetchList as fetchUser } from '@/api/owner/profile'
import { MessageBox } from 'mint-ui'

import Confirm from './Confirm'

export default {
  name: 'Form',
  components: {
    Confirm
  },
  data() {
    return {
      data: {
        userName: '',
        mobileNumber: '',
        userAccount: '',
        email: '',
        fullName: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let userDate = this.$route.params.data

      if (!userDate) {
        let { success, data } = await fetchUser()
        if (success) {
          userDate = data
        }
      }
      this.data = userDate
    },
    clear() {
      this.data.userName = ''
      this.data.mobileNumber = ''
      this.data.email = ''
    },
    confirm() {
      this.$validator.validate().then(async result => {
        if (result) {
          let { success, msg } = await fetchEdit(this.data)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.is-danger {
  color: #f00;
  padding: 0 10px 10px;
}
</style>
