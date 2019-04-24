<template>
  <div class="item">
    <nuxt-link :to="'/owner/stock/adjust/' + data.adjustUkid " tag="div" class="info">
      <div class="info">
        <div class="hd">
          <span class="hd-first">{{ data.stockName }}</span>
        </div>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
        <div class="bd">
          <wms-cell :title="'调整数量'" :value="data.adjustQty || 0"/>
          <wms-cell title="创建时间" :value="data.createTime | date"/>
          <wms-cell title="状态" placeholder="无" :value="data.adjustStatusName"/>
        </div>
      </div>
    </nuxt-link>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation_box">
      <div class="desc">{{ data.adjustNo }}</div>
      <div>
        <mt-button
          v-if="data.adjustStatus === 10"
          type="primary"
          size="small"
          plain
          @click="cancelSingle(data.adjustUkid)"
        >取消</mt-button>
        <mt-button
          v-if="data.adjustStatus === 10"
          type="primary"
          size="small"
          plain
          @click="checkSingle(data.adjustUkid)"
        >审核</mt-button>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.adjustUkid}?tb=st_adjust_header&orderNo=${data.adjustNo}`"
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
import { checkAdjust, cancelAdjust } from '@/api/owner/stock'
export default {
  name: 'ReceiveItem',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    checkSingle(id) {
      MessageBox.confirm('是否审核该调整单?').then(async action => {
        if (action === 'confirm') {
          let { success, msg } = await checkAdjust(id)
          if (success) {
            this.$emit('check')
          } else {
            MessageBox({
              title: '提示',
              message: msg || '审核失败',
              showCancelButton: true
            })
          }
        }
      })
    },
    cancelSingle(id) {
      MessageBox.confirm('是否取消该调整单?').then(async action => {
        if (action === 'confirm') {
          let { success, msg } = await cancelAdjust(id)
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
  padding: 10px 10px 10px 0;
  & > .desc {
    padding-left: 10px;
  }
}
.operation {
  display: flex;
  justify-content: flex-end;
  // padding: 0 10px;
  /deep/ button {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
