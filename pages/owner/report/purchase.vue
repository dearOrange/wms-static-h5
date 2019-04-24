<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <div slot="content" class="list">
      <wms-header title="采购查询">
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
import OrderSearch from '@/components/owner/report/purchase/Search'
import Condition from '@/components/owner/report/purchase/condition'
import OrderResult from '@/components/owner/report/purchase/result'
import OrderTab from '@/components/owner/report/purchase/Filter'
import {
  CurentTime,
  PrevTime,
  CurentMonthFirst,
  CurentMonthLast,
  PrevMonthFirst,
  PrevMonthLast
} from '@/plugins/fordate'

export default {
  name: 'ReportPurchase',
  components: {
    OrderResult,
    Condition,
    OrderSearch,
    OrderTab
  },
  data() {
    return {
      params: {
        categoryUkid: '',
        date: 't',
        sort: 'qtyDesc',
        startTime: CurentTime(),
        endTime: CurentTime(),
        supplierId: '',
        keywords: '',
        purchaseType: 'purchase'
      }
    }
  },
  watch: {
    'params.date': function(newVal) {
      if (newVal === 't') {
        this.params.startTime = CurentTime()
        this.params.endTime = CurentTime()
      } else if (newVal === 'y') {
        this.params.startTime = PrevTime()
        this.params.endTime = PrevTime()
      } else if (newVal === 'tm') {
        this.params.startTime = CurentMonthFirst()
        this.params.endTime = CurentMonthLast()
      } else if (newVal === 'lm') {
        this.params.startTime = PrevMonthFirst()
        this.params.endTime = PrevMonthLast()
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
