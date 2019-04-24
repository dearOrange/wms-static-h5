<template>
  <div>
    <AsyncLoader :loader="fetch" @success="data = $event">
      <template slot-scope="orderData">
        <div class="base-info">
          <wms-cell title="订单号" :value="data.orderNo" />
          <wms-cell title="订单日期" :value="data.createTime | date" />
        </div>
        <Receiver :data="orderData"/>
        <Box title="付款信息">
          <div slot="bd">
            <div class="total_qty">
              <span>数量：</span>
              <span>{{ count }}</span>
            </div>
            <div class="total_amount">
              <span>金额：</span>
              <span class="amount">{{ price | CNY }}</span>
            </div>
          </div>
        </Box>
        <div class="payment">
          <mt-button type="primary" size="small" plain @click="goPayment">
            <img src="/images/wechat_pay.png" height="24" width="auto" slot="icon">
          </mt-button>
        </div>
      </template>
    </AsyncLoader>
  </div>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import Receiver from '@/components/share/Receiver'
import Box from '@/components/share/Box'
import { sumBy } from 'lodash'

import {
  getDetailOfBasic,
  getDetailOfGoods,
  orderPayment
} from '@/api/customer/order'
import error from '@/utils/error'

export default {
  name: 'Container',
  components: {
    AsyncLoader,
    Box,
    Receiver
  },
  data() {
    return {
      wxPayData: {},
      data: {
        ordDetailList: []
      },
      count: 0,
      price: 0.00
    }
  },
  methods: {
    async fetch() {
      let { id, data: basicDataFromList } = this.$route.params
      let basicData = basicDataFromList
      let success = true
      if (!basicData) {
        let { data, success: basicSuccess } = await getDetailOfBasic(id)
        if (basicSuccess) {
          basicData = data
        }
        success = basicSuccess
      }
      let {
        data: ordDetailList,
        success: listSuccess
      } = await getDetailOfGoods(id)
      success = success && listSuccess

      this.count = sumBy(ordDetailList, 'orderQty')
      this.price = basicData.totalOrderAmount
      return {
        success,
        data: success
          ? {
              ...basicData,
              ordDetailList
            }
          : null
      }
    },
    async goPayment() {
      if (this.data.orderUkid === '') {
        return
      }
      let { success, data } = await orderPayment({
        appid: 'wx0790124a79149af3',
        orderUkid: this.data.orderUkid
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
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            this.$router.push('/customer/order/list')
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
.base-info {
  padding: 10px 0;
}
.total_amount,
.total_qty {
  font-size: 16px;

  .amount {
    font-size: 18px;
    color: #ff4500;
  }
}

.payment {
  text-align: center;
  margin-top: 18px;

  img {
    margin-top: 3px;
  }
}
</style>
