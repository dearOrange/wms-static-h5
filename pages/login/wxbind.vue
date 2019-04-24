<template>
  <div class="wxbind">
    <div class="title">登录验证</div>
    <wms-whitespace size="30"/>
    <div class="wxbind-form">
      <div>
        <mt-field v-model="wxbindData.mobileNumber" placeholder="手机号"/>
        <mt-field v-model="wxbindData.code" placeholder="验证码">
          <div class="sms-btn">
            <a @click="getSMS">{{ text }}</a>
          </div>
        </mt-field>
      </div>
      <wms-whitespace size="20"/>
      <mt-button :disabled="disabled" size="large" type="primary" @click="bind">确认</mt-button>
    </div>
  </div>
</template>

<script>
import { bindWechat, sendSMSCode } from '@/api/auth'
export default {
  name: 'Wxbind',
  auth: false,

  data() {
    return {
      wxbindData: {
        mobileNumber: '',
        code: ''
      },
      count: 60,
      isSending: false
    }
  },

  computed: {
    disabled() {
      return !this.wxbindData.mobileNumber || !this.wxbindData.code
    },
    text() {
      return this.isSending ? `${this.count}秒后重发` : '获取验证码'
    }
  },
  mounted() {
    let { unionid, loginToken } = this.$route.params || {}
    this.wxbindData.unionid = unionid
    this.wxbindData.loginToken = loginToken
  },

  methods: {
    async bind() {
      let { success, data } = await bindWechat(this.wxbindData)

      if (success) {
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
      } else {
        console.log(data)
      }
    },
    valid() {
      function isPhone(phone) {
        let rphone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        return rphone.test(phone)
      }

      if (this.wxbindData.mobileNumber === '') {
        console.log('请输入手机号')
        this.$toast('请输入手机号')
        return false
      }
      if (!isPhone(this.wxbindData.mobileNumber)) {
        console.log('手机号格式不正确')
        this.$toast('手机号格式不正确')
        return false
      }
      return true
    },
    getSMS() {
      if (this.isSending || !this.valid()) {
        return
      }
      this.isSending = true

      let self = this
      function countdown() {
        window.setTimeout(() => {
          self.count -= 1
          if (self.count === 0) {
            self.isSending = false
            self.count = 60
            return
          }
          countdown()
        }, 1000)
      }
      countdown()
      this.send()
    },
    async send() {
      let { success } = await sendSMSCode({
        mobileNumber: this.wxbindData.mobileNumber,
        type: 'bindWechat',
        system: 'NLWJ'
      })
      if (!success) {
        console.log('发送失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wxbind {
  padding: 20px;

  .title {
    text-align: center;
    margin-top: 15%;
  }

  .sms-btn {
    padding: 10px 16px;
    color: #fff;
    background-color: #26a2ff;
    font-size: 13px;
    border-radius: 4px;
    width: 108px;
    text-align: center;
  }
}
</style>
