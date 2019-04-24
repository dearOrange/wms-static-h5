<template>
  <div class="item">
    <div class="info">
      <div class="hd">
        <span class="hd-first">{{ data.customerName }}</span>
        <span class="hd-second">{{ data.stockName }}</span>
      </div>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      <div class="bd">
        <wms-cell title="创建时间" :value="data.createTime | date"/>
        <wms-cell title="状态" placeholder="无" :value="data.orderStatus | status('ORDER')"/>
        <wms-cell :title="orderNumTitle" :value="data.sumOrderQty || 0"/>
        <wms-cell :title="orderPriceTitle" :value="data.totalOrderAmount | CNY"/>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <span class="orderno">{{ data.orderNo }}</span>
      <span class="btns">
        <template v-if="editable">
          <mt-button plain size="small" type="primary" @click="cancel">取消</mt-button>
        </template>
        <nuxt-link
          v-if="editable || confirmable"
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
    // 状态值550 表示部分收货
    confirmable() {
      return this.data.orderStatus === 550
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
