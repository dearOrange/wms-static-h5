<template>
  <section class="redirect">
    <div>
      登录中......
    </div>
  </section>
</template>

<script>
import { qrcodeCheck } from '@/api/auth'

export default {
  name: 'Redirect',
  auth: false,

  data() {
    return {
      wxToken: null
    }
  },

  mounted: function() {
    this.weixinLogin()
  },
  methods: {
    async weixinLogin() {
      function getQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      }

      let code = getQueryString('code')
      let { success, data: loginToken } = await qrcodeCheck({
        appid: 'wx0790124a79149af3'
      })
      if (success) {
        this.wxToken = loginToken

        if (loginToken) {
          let {
            success: checkSuccess,
            data: { loginStatus, expandToken }
          } = await qrcodeCheck({ loginToken, code })
          if (checkSuccess) {
            if (loginStatus === 2) {
              let isKey = this.$cookies.isKey('nlwj_share_token')
              if (isKey) {
                let token = this.$cookies.get('nlwj_share_token')
                this.$cookies.remove('nlwj_share_token')
                this.$router.replace('/share?token=' + token)
              } else if (window.location.host === 'h5.wms.1hll.cn') {
                window.location.href = 'http://h5.wms.1hll.cn/choose'
              } else {
                this.$router.replace('/choose')
              }
            }
            // 微信未绑定
            else if (loginStatus === 9) {
              let unionid = JSON.parse(expandToken).unionid
              this.$router.push({
                name: 'login-wxbind',
                params: {
                  loginToken: loginToken,
                  unionid: unionid,
                  expandToken: expandToken
                }
              })
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.redirect {
  > div {
    margin-top: 35%;
    text-align: center;
  }
}
</style>
