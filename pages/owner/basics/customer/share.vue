<template>
  <section class="share">
    <wms-header title="转发邀请客户加入"/>
  </section>
</template>

<script>
import wx from 'weixin-js-sdk'
import { weixinJsConfig } from '@/api/auth'
import { getShareToken } from '@/api/owner/profile'

export default {
  name: 'CustomerShare',
  mounted() {
    this.wxconfig()
  },
  methods: {
    async wxconfig() {
      let url = location.href.split('#')[0]

      let ua = navigator.userAgent.toLowerCase()
      let isIos = ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1
      let isAndroid = ua.indexOf('android') !== -1
      let isWeixin = ua.indexOf('micromessenger') !== -1
      if (isWeixin && isIos) {
        // iOS 微信有BUG
        url = 'http://h5.wms.1hll.cn/choose'
      }

      let { success, data } = await weixinJsConfig({
        appid: 'wx0790124a79149af3',
        url: url
      })

      let { success: tSuccess, data: t } = await getShareToken({
        shareType: 'owner'
      })

      if (success) {
        if (!tSuccess) {
          t = 'null'
        }
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx0790124a79149af3', // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
          ], // 必填，需要使用的JS接口列表
          success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            console.log(res)
          },
          fail: function(res) {
            console.log(res)
          }
        })

        wx.ready(function() {
          wx.updateAppMessageShareData({
            title: '邀请加入农链万家', // 分享标题
            desc: '邀请加入农链万家', // 分享描述
            link: 'http://h5.wms.1hll.cn/share?token=' + t, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://h5.wms.1hll.cn/images/logo.jpg', // 分享图标
            success: function() {
              console.log('updateAppMessageShareData成功') // 设置成功
            }
          })

          wx.updateTimelineShareData({
            title: '邀请加入农链万家', // 分享标题
            link: 'http://h5.wms.1hll.cn/share?token=' + t, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://h5.wms.1hll.cn/images/logo.jpg', // 分享图标
            success: function() {
              console.log('updateAppMessageShareData成功') // 设置成功
            }
          })

          if (isAndroid) {
            wx.onMenuShareAppMessage({
              title: '邀请加入农链万家', // 分享标题
              desc: '邀请加入农链万家', // 分享描述
              link: 'http://h5.wms.1hll.cn/share?token=' + t, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://h5.wms.1hll.cn/images/logo.jpg', // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function() {
                // 用户点击了分享后执行的回调函数
                console.log('share')
              }
            })

            wx.onMenuShareTimeline({
              title: '邀请加入农链万家', // 分享标题
              link: 'http://h5.wms.1hll.cn/share?token=' + t, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://h5.wms.1hll.cn/images/logo.jpg', // 分享图标
              success: function() {
                // 用户点击了分享后执行的回调函数
                console.log('share')
              }
            })
          }
        })

        wx.error(function(res) {
          console.log('wx error')
          console.log(res)
        })
      }
    }
  }
}
</script>
