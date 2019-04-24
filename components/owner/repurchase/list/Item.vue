<template>
  <div class="item">
    <nuxt-link
      :to="{
        name: editable ? 'owner-repurchase-edit-id' : 'owner-repurchase-id',
        params: {
          id: data.backUkid,
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
          <wms-cell title="创建时间" :value="data.createTime | date"/>
          <wms-cell title="状态" :value="data.backStatus | status('REPURCHASE')"/>
          <wms-cell :title="'退货数量'" :value="data.backNum || 0"/>
          <wms-cell :title="'金额'" :value="data.refundAmount | CNY"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <span class="orderno">{{ data.backNo }}</span>
      <span class="btns">
        <template v-if="editable">
          <mt-button plain size="small" type="primary" @click="cancel">取消</mt-button>
        </template>
        <nuxt-link
          v-if="editable || confirmable"
          class="btn"
          :to="{
            name: 'owner-repurchase-confirm-id',
            params: {
              id: data.backUkid,
              data
            }
          }"
          tag="span"
        >
          <mt-button plain size="small" type="primary">确认发货</mt-button>
        </nuxt-link>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.backUkid}?tb=pr_purchase_back&orderNo=${data.backNo}`"
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
import { remove } from '@/api/owner/repurchase'

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
      return this.data.backStatus === 100
    },
    // 状态值200 表示部分收货
    confirmable() {
      return this.data.backStatus === 200
    }
  },
  methods: {
    cancel() {
      MessageBox.confirm('是否取消该采购退单?').then(async action => {
        if (action === 'confirm') {
          let { success } = await remove(this.data.backUkid)
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
