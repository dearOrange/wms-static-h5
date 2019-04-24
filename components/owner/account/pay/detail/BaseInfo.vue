<template>
  <div class="base-info">
    <div class="info-border">
      <wms-cell title="业务日期" :value="startTime"/>
    </div>
    <div class="info-border">
      <wms-cell title="付款时间" :value="startDateTime" clickable @click="pickDateTimeStart"/>
    </div>
    <div class="info-border">
      <wms-cell title="关联类型" :value="params.relatedTypeName"/>
    </div>
    <div class="info-border">
      <wms-cell title="关联单号" :value="params.relatedOrderNo"/>
    </div>
    <div class="info-border">
      <wms-cell title="单据日期" :value="dateTime"/>
    </div>
    <div v-if="params.otherSideType === 'CR'" class="info-border">
      <wms-cell title="客户" :value="params.paymentSideName"/>
    </div>
    <div v-if="params.otherSideType === 'SR'" class="info-border">
      <wms-cell title="供应商" :value="params.paymentSideName"/>
    </div>
    <div class="info-border">
      <wms-cell title="应付金额" :value="params.remainingAmount"/>
    </div>
    <div>
      <mt-field v-model="params.paidAmountSum" label="本次付款" placeholder="请输入本次付款金额"/>

      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
    <div>
      <mt-cell title="减免金额">
        <span class="conBox">{{ params.reduceAmountSum }}</span>
        <mt-switch v-model="value"/>
      </mt-cell>

      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <!-- <wms-cell title="减免金额" :value="params.reduceAmountSum"></wms-cell> -->
    </div>
    <div class="info-border">
      <wms-cell title="剩余金额" :value="balanceAccount"/>
    </div>
    <!-- <div class="info-border">
      <wms-cell title="付款人" value="王小二"/>
    </div>-->
    <!-- <div class="info-border">
      <wms-cell title="商品详情" value="查看"/>
    </div>-->
    <mt-datetime-picker ref="pickerStart" v-model="datetimestart" type="datetime"/>

    <account-order-addup-save
      :pay-account="params.paidAmountSum"
      :balance-num="balanceAccount"
      @change="accountChange"
    />
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import AddupSave from '@/components/owner/account/pay/detail/AddupSave'
import { accountSingle, getDetail } from '@/api/account/pay'
export default {
  name: 'BaseInfo',
  components: {
    AccountOrderAddupSave: AddupSave
  },
  data() {
    return {
      datetimestart: '',
      value: false,
      balanceAccount: 0,
      params: {
        payTime: ''
      }
    }
  },
  computed: {
    startDateTime() {
      if (this.params.payTime) {
        return this.$format(this.params.payTime, 'YYYY-MM-DD HH:mm:ss')
      } else {
        return this.$format(
          new Date(new Date().getTime()),
          'YYYY-MM-DD HH:mm:ss'
        )
      }
    },
    startTime() {
      if (this.params.billDate) {
        return this.$format(this.params.billDate, 'YYYY-MM-DD')
      } else {
        return ''
      }
    },
    dateTime() {
      if (this.params.relatedDate) {
        return this.$format(this.params.relatedDate, 'YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      if (newVal) {
        this.params.reduceAmountSum =
          this.params.remainingAmount - this.params.paidAmountSum
      } else {
        this.params.reduceAmountSum = 0
      }
      this.balanceAccount =
        this.params.remainingAmount -
        this.params.paidAmountSum -
        this.params.reduceAmountSum
    },
    datetimestart: function(newVal, oldVal) {
      this.params.payTime = newVal
    },
    'params.paidAmountSum': function(newVal, oldVal) {
      if (!!newVal && newVal <= this.params.remainingAmount) {
        this.balanceAccount =
          this.params.remainingAmount -
          this.params.paidAmountSum -
          this.params.reduceAmountSum
      }
      if (!!newVal && newVal > this.params.remainingAmount) {
        Toast({
          message: '付款金额不能大于应付金额',
          duration: 3000
        })
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    pickDateTimeStart() {
      this.datetimestart = new Date()
      this.$refs.pickerStart.open()
    },
    async accountChange() {
      if (!this.value) {
        this.params.reduceAmountSum = 0
      }
      if (this.params.remainingAmount < this.params.paidAmountSum) {
        Toast({
          message: '付款金额不能大于应付金额',
          duration: 3000
        })
        return
      }
      let res = {
        payableBillUkid: this.params.payableBillUkid,
        payTime: this.startDateTime,
        paidAmountSum: this.params.paidAmountSum,
        reduceAmountSum: this.params.reduceAmountSum
      }
      let { success, msg } = await accountSingle(res)
      if (success) {
        MessageBox.alert('结算成功').then(action => {
          this.$router.push('/owner/account/pay/list')
        })
      } else {
        MessageBox({
          title: '提示',
          message: msg || '结算失败',
          showCancelButton: true
        })
      }
    },
    async getList() {
      let { success, data } = await getDetail(this.$route.params.id)
      if (success) {
        this.params = { ...this.params, ...data }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-border {
  padding: 8px 0;
  border-bottom: 1px solid #999;
}
.conBox {
  margin-right: 20px;
}
</style>
<style>
.mint-cell-text {
  font-size: 14px;
  color: #888;
}
</style>
