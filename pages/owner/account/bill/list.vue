<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <div slot="content" class="list">
      <wms-header title="结算明细查询">
        <template slot="right">
          <span @click="toggleDrawer(true)">条件查询</span>
        </template>
      </wms-header>
      <bill-filter :filter="params"/>
      <account-bill-result :params="params"/>
    </div>
    <template slot="drawer">
      <BaseInfo :filters="params" @confirm="filtersConfirm" @cancel="toggleDrawer(false)"/>
    </template>
  </wms-drawer-layout>
</template>

<script>
import { cloneDeep } from 'lodash'
import Result from '@/components/owner/account/bill/result'
import BaseInfo from '@/components/owner/account/bill/BaseInfo'
import Filter from '@/components/owner/account/bill/Filter'
import {
  CurentTime,
  PrevTime,
  CurentMonthFirst,
  CurentMonthLast,
  PrevMonthFirst,
  PrevMonthLast
} from '@/plugins/fordate'
export default {
  name: 'AccountBill',
  components: {
    AccountBillResult: Result,
    BaseInfo,
    BillFilter: Filter
  },
  data() {
    return {
      params: {
        billDateBegin: CurentTime(),
        billDateEnd: CurentTime(),
        otherSideType: 'CR',
        receiveSideId: '',
        billType: '',
        date: 't'
        // statusList: '',
      }
    }
  },
  watch: {
    'params.date': function(newVal) {
      if (newVal === 't') {
        this.params.billDateBegin = CurentTime()
        this.params.billDateEnd = CurentTime()
      } else if (newVal === 'y') {
        this.params.billDateBegin = PrevTime()
        this.params.billDateEnd = PrevTime()
      } else if (newVal === 'tm') {
        this.params.billDateBegin = CurentMonthFirst()
        this.params.billDateEnd = CurentMonthLast()
      } else if (newVal === 'lm') {
        this.params.billDateBegin = PrevMonthFirst()
        this.params.billDateEnd = PrevMonthLast()
      }
    }
  },
  methods: {
    toggleDrawer(visible) {
      this.$refs.listDrawer.toggle(visible)
    },
    filtersConfirm() {
      this.params = cloneDeep(this.params)
      this.toggleDrawer(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
