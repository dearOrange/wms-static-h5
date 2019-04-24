<template>
  <div class="order-sheet-box">
    <div class="layer"/>
    <div class="order-sheet">
      <h2>输入本次付款金额</h2>
      <div class="order-layer">
        <wms-cell title="付款时间" :value="startDateTime" clickable @click="pickDateTimeStart"/>
        <wms-cell title="本次应付" :value="receiveMoney | CNY"/>
        <mt-field v-model="params.paidAmountSum" label="本次付款" placeholder="请输入本次收款金额"/>
        <wms-cell title="本次剩余" :value="balanceAccount | CNY"/>
        <wms-cell title="本次减免" :value="params.reduceAmountSum | CNY"/>
        <mt-switch v-model="value">启用减免</mt-switch>
      </div>
      <div class="btns">
        <div @click="cancel">取消</div>
        <div class="btn_border" @click="sure">确认</div>
      </div>
    </div>
    <mt-datetime-picker ref="pickerStart" v-model="datetimestart" type="datetime"/>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'OrderSheet',
  props: {
    receiveMoney: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      datetimestart: '',
      value: false,
      balanceAccount: '0',
      params: {
        paidAmountSum: '',
        reduceAmountSum: '0',
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
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      if (newVal) {
        this.params.reduceAmountSum =
          this.receiveMoney - this.params.paidAmountSum
      } else {
        this.params.reduceAmountSum = 0
      }
      this.balanceAccount =
        this.receiveMoney -
        this.params.paidAmountSum -
        this.params.reduceAmountSum
    },
    'params.paidAmountSum': function(newVal, oldVal) {
      if (!!newVal && newVal <= this.receiveMoney) {
        if (this.value) {
          this.params.reduceAmountSum =
            this.receiveMoney - this.params.paidAmountSum
        } else {
          this.params.reduceAmountSum = 0
        }

        this.balanceAccount =
          this.receiveMoney -
          this.params.paidAmountSum -
          this.params.reduceAmountSum
      }
      if (!!newVal && newVal > this.receiveMoney) {
        Toast({
          message: '收款金额不能大于应收金额',
          duration: 3000
        })
      }
    },
    datetimestart: function(newVal, oldVal) {
      this.params.payTime = newVal
    }
  },
  methods: {
    cancel() {
      this.$emit('change')
    },
    sure() {
      if (
        !!this.params.paidAmountSum &&
        this.params.paidAmountSum > this.receiveMoney
      ) {
        Toast({
          message: '付款金额不能大于应付金额',
          duration: 3000
        })
        return
      }
      this.$emit('submit', this.params)
    },
    pickDateTimeStart() {
      this.datetimestart = new Date()
      this.$refs.pickerStart.open()
    }
  }
}
</script>

<style lang="scss" scoped>
.order-sheet-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 6;
}
.layer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 7;
  background-color: rgba(255, 255, 255, 0.65);
}
.order-sheet {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 10;
  > h2 {
    padding: 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.65);
  }
  > .order-layer {
    width: 100%;
    padding: 10px;
    background: #fff;
    box-shadow: inset 0px 1px 3px 0px rgba(126, 126, 126, 0.53);
  }
  > .btns {
    display: flex;
    border-top: 1px solid #ccc;
    > div {
      padding: 20px 0;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > .btn_border {
      border-left: 1px solid #999;
    }
    background: #fff;
  }
}
</style>
