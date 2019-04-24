<template>
  <div class="item">
    <nuxt-link
      :to="{
        name: editable ? 'owner-reorder-edit-id' : 'owner-reorder-id',
        params: {
          id: data.returnUkid,
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
          <wms-cell title="状态" placeholder="无" :value="data.returnStatus | status('REORDER')"/>
          <wms-cell title="退货数量" :value="data.sumReturnQty || 0"/>
          <wms-cell title="金额" :value="data.totalAmount | CNY"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <span class="orderno">{{ data.returnNo }}</span>
      <span class="btns">
        <template v-if="editable">
          <mt-button plain size="small" type="primary" @click="cancel">取消</mt-button>
        </template>
        <nuxt-link
          v-if="editable || confirmable"
          class="btn"
          :to="{
            name: 'owner-reorder-confirm-id',
            params: {
              id: data.returnUkid,
              data
            }
          }"
          tag="span"
        >
          <mt-button plain size="small" type="primary">确认收货</mt-button>
        </nuxt-link>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.returnUkid}?tb=se_return_header&orderNo=${data.returnNo}`"
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
import { remove } from '@/api/owner/reorder'

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
      return this.data.returnStatus === 100
    },
    // 状态值550 表示部分收货
    confirmable() {
      return this.data.returnStatus === 550
    }
  },

  methods: {
    cancel() {
      MessageBox.confirm('是否取消该销售退单?').then(async action => {
        if (action === 'confirm') {
          let { success } = await remove(this.data.returnUkid)
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
