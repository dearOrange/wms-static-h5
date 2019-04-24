<template>
  <section class="login">
    <div class="login-logo">
      <img slot="icon" src="/images/logo.jpg">
    </div>
    <wms-whitespace size="30"/>
    <div class="login-form">
      <div>
        <mt-field v-model="account" placeholder="用户名/手机号"/>
        <mt-field v-model="password" placeholder="密码" type="password"/>
      </div>
      <wms-whitespace size="20"/>
      <mt-button :disabled="disabled" size="large" type="primary" @click="doLogin">登录</mt-button>
    </div>
  </section>
</template>

<script>
import { loginByAccount, getLoginStatus } from '@/api/auth'
import config from '@/config'
let encrypt
if (process.client) {
  let { JSEncrypt } = require('jsencrypt')
  encrypt = new JSEncrypt()
  encrypt.setPublicKey(config.pubkey)
}

let Base64 = require('js-base64').Base64

export default {
  name: 'Login',
  auth: false,
  data() {
    return {
      account: '',
      password: ''
    }
  },
  computed: {
    disabled() {
      return !this.account || !this.password
    }
  },
  mounted: function() {
    this.checkLogin()
  },
  methods: {
    goLoggedPage() {
      if (window.location.host === 'h5.wms.1hll.cn') {
        // 正式环境设置url, 解决iOS微信的BUG
        window.location.href = 'http://h5.wms.1hll.cn/choose'
      } else {
        this.$router.replace('/choose')
      }
    },
    async checkLogin() {
      let { success, data: loginStatus } = await getLoginStatus()
      if (success && loginStatus) {
        this.goLoggedPage()
      } else {
        let ua = navigator.userAgent.toLowerCase()
        let isWeixin = ua.indexOf('micromessenger') !== -1
        if (isWeixin && process.env.NODE_ENV !== 'development') {
          this.weixinLogin()
        }
      }
    },
    async doLogin() {
      let encryptedPwd = encrypt.encrypt(this.password)

      let { success } = await loginByAccount({
        userAccount: this.account,
        userPassword: encryptedPwd
      })

      if (success) {
        let isKey = this.$cookies.isKey('nlwj_share_token')
        if (isKey) {
          let token = this.$cookies.get('nlwj_share_token')
          this.$cookies.remove('nlwj_share_token')
          this.$router.replace('/share?token=' + token)
        } else {
          this.goLoggedPage()
        }
      }
    },
    weixinLogin() {
      let state = Base64.encode(
        `RDT${window.location.protocol}//${
          window.location.host
        }/redirect?state=0`
      )

      let redirectUrl = 'http://gcc.1hll.cn/weixinCallback_h5.html'
      let url =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0790124a79149af3&redirect_uri=' +
        redirectUrl +
        '&response_type=code&scope=snsapi_userinfo&state=' +
        state +
        '#wechat_redirect'
      window.top.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
}
.login-logo {
  > img {
    display: block;
    margin: 5% auto;
    border-radius: 50%;
  }
}
</style>
