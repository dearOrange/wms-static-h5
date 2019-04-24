<template>
  <div class="item">
    <div class="info">
      <div class="hd">
        <span class="hd-first">{{ data.paymentSideName }}</span>
      </div>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      <div class="bd">
        <wms-cell :title="'应付'" :value="data.payableAmount | CNY"/>
        <wms-cell :title="'已付'" :value="data.paidAmount | CNY"/>
        <wms-cell v-if="data.reduceAmount" :title="'减免'" :value="data.reduceAmount | CNY"/>
        <wms-cell title="创建时间" :value="data.billDate | date"/>
        <wms-cell title="状态" placeholder="无" :value="data.statusName"/>
        <wms-cell :title="'剩余'" :value="data.remainingAmount | CNY"/>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation_box">
      <div class="desc">{{ data.payableBillNo }}</div>
      <div class="operation">
        <mt-button
          v-if="data.payableBillStatus === 10 || data.payableBillStatus === 50"
          plain
          type="primary"
          size="small"
          @click="goDetail(data.payableBillUkid)"
        >结算</mt-button>
        <nuxt-link
          class="btn"
          :to="`/public/logger/${data.payableBillUkid}?tb=fp_payable_bill&orderNo=${data.payableBillNo}`"
          tag="span"
        >
          <mt-button type="primary" plain size="small">查看日志</mt-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayItem',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: '/owner/account/pay/' + id
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
  & > .desc {
    padding-left: 10px;
  }
}
.operation {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  > .btn {
    margin-left: 5px;
  }
}
</style>
