<template>
  <div class="item">
    <div class="info">
      <div class="hd">
        <span class="hd-first">{{ data.paymentSideName }}</span>
      </div>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
      <div class="bd">
        <wms-cell :title="'账单类型'" :value="data.billType"/>
        <wms-cell title="业务日期" :value="data.billDate | date"/>
        <wms-cell :title="data.billType === '应收账单' ? '收款日期' : '付款日期'" :value="data.payTime | date"/>
        <!-- <wms-cell title="创建时间" :value="data.billDate | date"/> -->
        <wms-cell :title="'金额'" :value="data.paidAmount | CNY"/>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
  </div>
</template>

<script>
export default {
  name: 'AccountItem',
  props: {
    data: {
      type: Object
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
.operation {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  /deep/ button {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
