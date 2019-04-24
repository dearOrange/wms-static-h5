<template>
  <section>
    <wms-header title="系统订购续费" />
    <div class="subscribe">
      <mt-radio
        title="选择订购"
        v-model="priceUkid"
        :options="priceOptions"
        class="checklist"
      ></mt-radio>
      <div class="subscribe_btn">
        <div class="owner-subscribe"><a @click="goSubscribe">立即支付开通</a></div>
      </div>
    </div>
  </section>
</template>

<script>
import { subscribe, getPriceList } from '@/api/subscribe'
import error from '@/utils/error'

export default {
  name: 'Subscribe',
  data() {
    return {
      wxPayData: {},
      priceUkid: '',
      priceOptions: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {

      let { success, data } = await getPriceList({
        softwareType: 'NLWJ'
      })
      if (success) {
        for(let index in data) {
          if (data[index].allowSubscribe !== 0) {
            this.priceOptions.push({
              label: data[index].priceName + '  原价：' + data[index].normalPrice + '  现价：' + data[index].salePrice,
              value: data[index].softwarePriceUkid.toString(),
              disabled: data[index].allowSubscribe === 0
            })
          }
        }
      }
    },
    async goSubscribe() {
      if (this.priceUkid === '') {
        error('1001', { message: '请先选择订购类型' })
        return
      }
      let { success, data } = await subscribe({
        appid: 'wx0790124a79149af3',
        priceUkid: this.priceUkid
      })

      if (success) {
        this.wxPayData = data
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener(
              'WeixinJSBridgeReady',
              this.onBridgeReady,
              false
            )
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        } else {
          this.onBridgeReady()
        }
      }
    },
    onBridgeReady() {
      let data = this.wxPayData
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: 'wx0790124a79149af3', // 公众号名称，由商户传入
          timeStamp: data.timeStamp.toString(), // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          'package': data.packageStr,
          signType: 'MD5', // 微信签名方式：
          paySign: data.signature // 微信签名
        },
        function(res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.$router.push('/owner/profile')
          } else {
            // 支付失败
            error('1001', { message: '支付不成功' })
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.subscribe {
  padding: 20px;

  .subscribe_btn {
    text-align: center;
    margin-top: 30px;
  }

  .owner-subscribe {
    display: inline-block;
    height: 44px;
    width: 160px;
    border-radius: 6px;
    background: #26a2ff;
    color: #fff;

    a {
      line-height: 40px;
    }
  }
}
</style>
