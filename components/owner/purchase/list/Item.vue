<template>
  <div class="item">
    <nuxt-link
      :to="{
        name: editable ? 'owner-purchase-edit-id' : 'owner-purchase-id',
        params: {
          id: data.purchaseUkid,
          data
        }
      }"
      tag="div"
    >
      <div class="info">
        <div class="hd">
          <span class="hd-first">{{ data.supplierName }}</span>
          <span class="hd-second">{{ data.stockName }}</span>
        </div>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
        <div class="bd">
          <wms-cell title="创建时间" :value="data.createTime | date('YYYY-MM-DD HH:mm:ss')"/>
          <wms-cell title="状态" placeholder="无" :value="data.purchaseStatus | status('PURCHASE')"/>
          <wms-cell :title="purchaseNumTitle" :value="data.purchaseNum || 0"/>
          <wms-cell :title="purchasePriceTitle" :value="data.totalAmount | CNY"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <span class="orderno">{{ data.purchaseNo }}</span>
      <span class="btns">
        <template v-if="editable">
          <mt-button plain size="small" type="primary" @click="cancel">取消</mt-button>
        </template>
        <nuxt-link
          v-if="editable || confirmable"
          class="btn"
          :to="{
            name: 'owner-purchase-confirm-id',
            params: {
              id: data.purchaseUkid,
              data
            }
          }"
          tag="span"
        >
          <mt-button plain size="small" type="primary">确认收货</mt-button>
        </nuxt-link>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.purchaseUkid}?tb=pr_purchase_header&orderNo=${data.purchaseNo}`"
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
import { remove } from '@/api/owner/purchase'

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
      return this.data.purchaseStatus === 100
    },
    // 状态值200 表示部分收货
    confirmable() {
      return this.data.purchaseStatus === 200
    },
    purchaseNumTitle() {
      return this.data.purchaseStatus === 100 ||
        this.data.purchaseStatus === 990 ||
        this.data.purchaseStatus === 200
        ? '采购数量'
        : '收货数量'
    },
    purchasePriceTitle() {
      return this.data.purchaseStatus === 100 ||
        this.data.purchaseStatus === 990 ||
        this.data.purchaseStatus === 200
        ? '金额'
        : '收货金额'
    }
  },

  methods: {
    cancel() {
      MessageBox.confirm('是否取消该采购单？').then(async action => {
        if (action === 'confirm') {
          let { success } = await remove(this.data.purchaseUkid)
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
