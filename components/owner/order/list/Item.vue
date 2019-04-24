<template>
  <div class="item">
    <nuxt-link
      :to="{
        name: editable ? 'owner-order-edit-id' : 'owner-order-id',
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
          <wms-cell title="状态" placeholder="无" :value="data.orderStatus | status('ORDER')"/>
          <wms-cell
            v-if="data.extendAttr.onlinePayment == 1"
            title="付款状态"
            placeholder="无"
            :value="data.paymentStatus | status('PAYMENT')"
          />
          <wms-cell :title="orderCountTitle" :value="orderCount || 0"/>
          <wms-cell :title="orderPriceTitle" :value="orderPrice | CNY"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <span class="orderno">{{ data.orderNo }}</span>
      <span class="btns">
        <template v-if="editable">
          <mt-button plain size="small" type="primary" @click="cancel">取消</mt-button>
        </template>
        <nuxt-link
          v-if="editable || isConfirmPart"
          class="btn"
          :to="{
            name: 'owner-order-confirm-id',
            params: {
              id: data.orderUkid,
              data
            }
          }"
          tag="span"
        >
          <mt-button plain size="small" type="primary">确认发货</mt-button>
        </nuxt-link>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.orderUkid}?tb=se_order_header&orderNo=${data.orderNo}`"
          tag="span"
        >
          <mt-button plain size="small" type="primary">操作日志</mt-button>
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { remove } from '@/api/owner/order'

export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 状态值100 表示创建
    editable() {
      return this.data.orderStatus === 100
    },
    // 部分收货
    isConfirmPart() {
      return this.data.orderStatus === 550
    },
    // 是否全部发货
    isConfirmDone() {
      return this.data.orderStatus === 600
    },
    isConfirm() {
      return this.isConfirmPart || this.isConfirmDone
    },
    orderCountTitle() {
      return this.isConfirm ? '发货数量' : '订单数量'
    },
    orderPriceTitle() {
      return this.isConfirm ? '发货金额' : '订单金额'
    },
    orderCount() {
      return this.isConfirm ? this.data.sumShippedQty : this.data.sumOrderQty
    },
    orderPrice() {
      return this.isConfirm
        ? this.data.totalActualAmount
        : this.data.totalOrderAmount - this.data.reduceAmount
    }
  },

  methods: {
    cancel() {
      MessageBox.confirm('是否取消该订单?').then(async action => {
        if (action === 'confirm') {
          let { success } = await remove(this.data.orderUkid)
          if (success) {
            this.$emit('cancel')
          }
        }
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
