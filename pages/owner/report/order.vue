<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <div slot="content" class="list">
      <wms-header title="销售查询">
        <template slot="right">
          <span @click="toggleDrawer(true)">条件查询</span>
        </template>
      </wms-header>
      <order-search :params="params"/>
      <order-tab :filter="params"/>
      <order-result :params="params"/>
    </div>
    <template slot="drawer">
      <Condition :filters="params" @confirm="filtersConfirm" @cancel="toggleDrawer(false)"/>
    </template>
  </wms-drawer-layout>
</template>

<script>
import { cloneDeep } from 'lodash'
import OrderSearch from '@/components/owner/report/order/Search'
import Condition from '@/components/owner/report/order/condition'
import OrderResult from '@/components/owner/report/order/result'
import OrderTab from '@/components/owner/report/order/Filter'
import {
  CurentTime,
  PrevTime,
  CurentMonthFirst,
  CurentMonthLast,
  PrevMonthFirst,
  PrevMonthLast
} from '@/plugins/fordate'

export default {
  name: 'ReportOrder',
  components: {
    OrderResult,
    Condition,
    OrderSearch,
    OrderTab
  },
  data() {
    return {
      params: {
        createTimeBegin: CurentTime(),
        createTimeEnd: CurentTime(),
        date: '',
        customerId: '',
        sort: 'qtyDesc',
        businessType: 'order',
        categoryUkid: '',
        productName: ''
      }
    }
  },
  watch: {
    'params.date': function(newVal) {
      if (newVal === 't') {
        this.params.createTimeBegin = CurentTime()
        this.params.createTimeEnd = CurentTime()
      } else if (newVal === 'y') {
        this.params.createTimeBegin = PrevTime()
        this.params.createTimeEnd = PrevTime()
      } else if (newVal === 'tm') {
        this.params.createTimeBegin = CurentMonthFirst()
        this.params.createTimeEnd = CurentMonthLast()
      } else if (newVal === 'lm') {
        this.params.createTimeBegin = PrevMonthFirst()
        this.params.createTimeEnd = PrevMonthLast()
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
.search_inp {
  display: flex;
  padding: 10px;
  & > div {
    height: 40px;
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    & > input {
      border: 0;
      margin: 1px;
      width: 98%;
      height: 98%;
      text-indent: 16px;
      outline: none;
    }
  }
}
.adjust_list_desc {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px;
  padding: 0;
  border-bottom: 1px solid #ccc;
}
.list {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
