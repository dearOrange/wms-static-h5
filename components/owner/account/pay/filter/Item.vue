<template>
  <div class="item">
    <div class="item_box">
      <div class="item--select">
        <span class="bf_select" @click="changeCheck(data)">
          <i v-if="check" class="bf_solid"/>
        </span>
      </div>
      <div>
        <div class="info">
          <account-cell :desc="data.paymentSideName"/>
          <account-cell :desc="'应付：' + data.payableAmount"/>
          <account-cell :desc="dateTime"/>
          <account-cell :desc="'已付：' + data.paidAmount"/>
          <account-cell :desc="data.statusName"/>
          <account-cell :desc="'剩余：' + data.remainingAmount"/>
        </div>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
        <div class="order">{{ data.payableBillNo }}</div>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
  </div>
</template>

<script>
import Cell from '@/components/owner/account/pay/filter/cell'
export default {
  name: 'PayFilter',
  components: {
    AccountCell: Cell
  },
  props: {
    data: {
      type: Object
    },
    isCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      check: false,
      selectItem: []
    }
  },
  computed: {
    dateTime() {
      if (this.data.billDate) {
        return this.$format(this.data.billDate, 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  },
  watch: {
    isCheck: function(newVal, oldVal) {
      if (newVal) {
        this.check = true
      } else {
        this.check = false
      }
    }
  },
  methods: {
    changeCheck(data) {
      this.check = !this.check
      this.$emit('change', { check: this.check, data: data })
    }
  }
}
</script>

<style lang="scss" scoped>
.item_box {
  display: flex;
  align-items: center;
  & > .item--select {
    padding: 10px;
    flex-shrink: 0;
  }
}
.info {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
.order {
  padding: 10px;
}
.sepline {
  height: 1px;
  margin: 10px;
  background: #ccc;
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
.bf_select {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 3px solid #666;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .bf_solid {
    display: block;
    width: 12px;
    height: 12px;
    background: #666;
    border-radius: 50%;
    border: 1px solid #666;
  }
}
</style>
