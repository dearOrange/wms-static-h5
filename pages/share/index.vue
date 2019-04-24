<template>
  <section class="share">
    <wms-header title="加入农链万家"/>
    <div class="share-form">
      <div v-if="joined" class="joined">
        <div>邀请你使用农链万家在线下单</div>
        <div>{{ ownerName }}</div>
        <div>已经是此货主的客户无需再次加入</div>
        <div>
          <mt-button type="primary" size="small" plain @click="goHome">进入系统</mt-button>
        </div>
      </div>
      <div v-else class="new-join">
        <div class="info">
          <div>邀请你使用农链万家在线下单</div>
          <div>{{ ownerName }}</div>
          <div>成为此货主的客户</div>
        </div>
        <div v-if="loginStatus">
          <div>
            <mt-field
              v-model="params.customerName"
              v-validate="'required'"
              data-vv-name="customerName"
              label="单位名称"
              type="string"
              placeholder="请输入单位名称"
            />
            <span v-show="errors.has('customerName')" class="is-danger">请输入单位名称</span>
            <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
          </div>
          <div>
            <wms-district v-model="district"/>
            <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
          </div>
          <div>
            <mt-field v-model="params.address.address" label="详细地址" placeholder="请输入详细地址"/>
            <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
          </div>
          <div class="add">
            <mt-button type="primary" size="large" @click="goAdd">确认加入</mt-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getLoginStatus } from '@/api/auth'
import {
  getCustomerByOwner,
  checkShareSelf,
  getShareOwner,
  saveShareCustomer
} from '@/api/customer/profile'

export default {
  name: 'Share',
  data() {
    return {
      token: '',
      ownerName: '',
      joined: false,
      loginStatus: false,
      district: [],
      params: {
        customerName: '',
        address: {
          provinceCode: '',
          cityCode: '',
          districtCode: '',
          address: ''
        },
        shareToken: ''
      }
    }
  },
  mounted() {
    function getQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }

    let token = getQueryString('token')
    this.token = token
    if (
      token === '' ||
      token === 'null' ||
      token === undefined ||
      token === null
    ) {
      this.$router.replace('/login')
    } else {
      this.checkLogin()
    }
  },
  methods: {
    async checkLogin() {
      let { success, data: loginStatus } = await getLoginStatus()
      if (success) {
        if (loginStatus) {
          // 已登录
          let { success: cSuccess, data: isSelf } = await checkShareSelf({
            token: this.token
          })
          if (cSuccess) {
            if (isSelf) {
              this.$router.replace('/login')
            } else {
              let {
                success: customerSuccess,
                data: ownerCustomer
              } = await getCustomerByOwner({
                token: this.token
              })
              if (customerSuccess) {
                console.log(ownerCustomer)
                if (ownerCustomer) {
                  this.ownerName = ownerCustomer.extendAttr.ownerName
                  this.joined = true
                } else {
                  // 新加入
                  let {
                    success: ownerSuccess,
                    data: owner
                  } = await getShareOwner({
                    token: this.token
                  })
                  if (ownerSuccess && owner) {
                    this.ownerName = owner.ownerName
                  }
                  console.log('not')
                }
              }
            }
          } else {
            // 出错直接跳转
            this.$router.replace('/login')
          }
          this.loginStatus = loginStatus
        } else {
          // 未登录需要先登录,再跳转回
          // 参数存入cookie，因跳转到微信登录地址url参数会丢失
          this.$cookies.set('nlwj_share_token', this.token, '30m')
          this.$router.replace('/login')
        }
      }
    },
    goHome() {
      this.$router.replace('/login')
    },
    goAdd() {
      this.$validator.validate().then(async result => {
        if (result) {
          let [provinceCode, cityCode, districtCode] = this.district
          this.params.address.provinceCode = provinceCode
          this.params.address.cityCode = cityCode
          this.params.address.districtCode = districtCode
          this.params.shareToken = this.token

          let { success } = await saveShareCustomer(this.params)
          if (success) {
            this.$router.replace('/login')
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

.share-form {
  padding: 10px;

  .joined {
    margin-top: 20px;
    text-align: center;

    > div {
      margin-bottom: 15px;
    }
  }

  .new-join {
    margin-top: 20px;

    .info {
      text-align: center;
      margin-bottom: 18px;

      > div {
        margin-bottom: 15px;
      }
    }

    .add {
      text-align: center;
      margin-top: 18px;
    }
  }
}
</style>
