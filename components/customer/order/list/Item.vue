<template>
  <div class="item">
    <nuxt-link
      :to="{
        name: editable ? 'customer-order-edit-id' : 'customer-order-id',
        params: {
          id: data.orderUkid,
          data
        }
      }"
      tag="div"
    >
      <div class="info">
        <div class="hd">
          <span class="hd-first">{{ data.customerName }}</span>
          <span class="hd-second">{{ data.stockName }}</span>
        </div>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
        <div class="bd">
          <wms-cell title="创建时间" :value="data.createTime | date"/>
          <wms-cell
            title="状态"
            placeholder="无"
            :value="data.orderStatus | status('CUSTOMER_ORDER')"
          />
          <wms-cell
            v-if="data.extendAttr.onlinePayment == 1"
            title="付款状态"
            placeholder="无"
            :value="data.paymentStatus | status('PAYMENT')"
          />
          <wms-cell :title="orderNumTitle" :value="data.sumOrderQty || 0"/>
          <wms-cell :title="orderPriceTitle" :value="(data.totalOrderAmount || 0) | CNY"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <span class="orderno">{{ data.orderNo }}</span>
      <span class="btns">
        <template v-if="editable">
          <mt-button plain size="small" type="primary" @click="cancel">取消</mt-button>
          <mt-button plain size="small" type="primary" @click="submit">提交</mt-button>
        </template>
        <template v-if="payable">
          <mt-button plain size="small" type="primary" @click="payment">付款</mt-button>
        </template>
        <nuxt-link class="btn" :to="`/public/logger/${data.orderUkid}?tb=se_order_header&orderNo=${data.orderNo}`" tag="span">
          <mt-button plain size="small" type="primary">操作日志</mt-button>
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
import { remove, submitFast } from '@/api/customer/order'

export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 状态值90 表示待提交
    editable() {
      return this.data.orderStatus === 90
    },
    // 状态值550 表示部分收货
    confirmable() {
      return this.data.orderStatus === 550
    },
    payable() {
      return (
        this.data.orderStatus === 100 &&
        this.data.paymentStatus === 10 &&
        this.data.extendAttr.onlinePayment === 1
      )
    },
    orderNumTitle() {
      return this.data.orderStatus === 100 ||
        this.data.orderStatus === 990 ||
        this.data.orderStatus === 550
        ? '订单数量'
        : '发货数量'
    },
    orderPriceTitle() {
      return this.data.orderStatus === 100 ||
        this.data.orderStatus === 990 ||
        this.data.orderStatus === 550
        ? '订单金额'
        : '发货金额'
    }
  },

  methods: {
    cancel() {
      this.$messagebox.confirm('是否取消该订单?').then(async action => {
        if (action === 'confirm') {
          let { success } = await remove(this.data.orderUkid)
          if (success) {
            this.$emit('changeStatus', 990)
          }
        }
      })
    },
    submit() {
      this.$messagebox.confirm('是否提交该订单?').then(async action => {
        if (action === 'confirm') {
          let { success } = await submitFast(this.data.orderUkid)
          if (success) {
            this.$emit('changeStatus', 100)
          }
        }
      })
    },
    payment() {
      this.$router.push({
        path: '/customer/order/payment/' + this.data.orderUkid
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  > .hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    > .hd-first {
      font-size: 14px;
    }
    > .hd-second {
      color: #999;
    }
  }
  > .bd {
    padding: 10px 0;
    /deep/ .cell {
      height: 32px;
    }
  }
}

.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  > .btns {
    > span {
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
