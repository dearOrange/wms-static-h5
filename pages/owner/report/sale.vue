<template>
  <div>
    <wms-header title="进销存查询"/>
    <!-- <SaleSearch :params="params"/> -->
    <!-- <div class="sale--box"> -->
    <SaleTab :filter="params"/>
    <SalePicker class="rangeDate" :params="params" @start="startDate" @end="endDate"/>
    <!-- </div> -->
    <SaleResult :params="params" class="sale--result"/>
  </div>
</template>

<script>
// import SaleSearch from '@/components/owner/report/sale/search'
import SalePicker from '@/components/owner/report/sale/Picker'
import SaleTab from '@/components/owner/report/sale/Filter'
import SaleResult from '@/components/owner/report/sale/Result'
import {
  CurentTime,
  PrevTime,
  CurentMonthFirst,
  CurentMonthLast,
  PrevMonthFirst,
  PrevMonthLast
} from '@/plugins/fordate'
export default {
  name: 'SearchSale',
  components: {
    // SaleSearch,
    SalePicker,
    SaleTab,
    SaleResult
  },
  data() {
    return {
      params: {
        billDateBegin: CurentTime(),
        billDateEnd: CurentTime(),
        stockId: '',
        date: ''
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
    startDate(value) {
      this.params.date = ''
      this.params.billDateBegin = value
    },
    endDate(value) {
      this.params.date = ''
      this.params.billDateEnd = value
    }
  }
}
</script>

<style lang="scss" scoped>
.rangeDate {
  position: fixed;
  right: -4px;
  top: 47px;
  z-index: 999;
}
</style>
