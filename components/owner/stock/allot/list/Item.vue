<template>
  <div class="item">
    <nuxt-link :to="'/owner/stock/allot/' + data.allocationUkid " tag="div" class="info">
      <div class="info">
        <div class="bd">
          <wms-cell :title="'调出仓'" placeholder="无" :value="data.fromStockName"/>
          <wms-cell :title="'调入仓'" placeholder="无" :value="data.toStockName"/>
          <wms-cell title="创建时间" :value="data.createTime | date"/>
          <wms-cell title="状态" placeholder="无" :value="data.allocationStatusName"/>
          <wms-cell :title="'调出数量'" :value="data.outQty || 0"/>
          <wms-cell :title="'调入数量'" :value="data.transferQty || 0"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation_box">
      <div class="desc">{{ data.allocationNo }}</div>
      <div class="operation">
        <div v-if="data.allocationStatus === 100">
          <mt-button type="primary" plain size="small" @click="cancelSingle(data.allocationUkid)">取消</mt-button>
          <mt-button type="primary" plain size="small" @click="toCheck(data.allocationUkid)">调出发货</mt-button>
        </div>
        <mt-button
          v-if="data.allocationStatus === 300"
          type="primary"
          plain
          size="small"
          @click="fromCheck(data.allocationUkid)"
        >调入发货</mt-button>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.allocationUkid}?tb=st_allocation_header&orderNo=${data.allocationNo}`"
          tag="span"
        >
          <mt-button type="primary" plain size="small">查看日志</mt-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { cancelAllot } from '@/api/owner/stock'

export default {
  name: 'ReceiveItem',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    cancelSingle(id) {
      MessageBox.confirm('是否取消该调拨单?').then(async action => {
        if (action === 'confirm') {
          let { success, msg } = await cancelAllot(id)
          if (success) {
            this.$emit('cancel')
          } else {
            MessageBox({
              title: '提示',
              message: msg || '取消失败',
              showCancelButton: true
            })
          }
        }
      })
    },
    fromCheck(id) {
      this.$router.push({
        name: 'owner-stock-allot-take',
        params: { id: id }
      })
    },
    toCheck(id) {
      this.$router.push({
        name: 'owner-stock-allot-delivery',
        params: { id: id }
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
  }
  > .bd {
    padding: 10px 0;
    /deep/ .cell {
      height: 32px;
    }
  }
}
.operation_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  & > .desc {
    padding-left: 10px;
  }
}
.operation {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  /deep/ button {
    // margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
  > .btn {
    margin-left: 5px;
  }
}
</style>
