<template>
  <div>
    <wms-header title="台账查询"/>
    <wms-search :params="params"/>
    <WareFilter :filter="params"/>
    <SalePicker
      class="rangeDate"
      @start="params.createDateBegin = $event"
      @end="params.createDateEnd = $event"
    />
    <stand-result :params="params"/>
  </div>
</template>

<script>
import Header from '@/components/share/Header'
// import WareTabs from '@/components/owner/stock/common/tabs'
import SalePicker from '@/components/owner/stock/standing/Picker'
import WmsSearch from '@/components/owner/stock/standing/Search'
import WareFilter from '@/components/owner/stock/standing/Filter'
import Result from '@/components/owner/stock/standing/result'

export default {
  name: 'StandSearch',
  components: {
    WmsHeader: Header,
    WmsSearch,
    WareFilter,
    SalePicker,
    StandResult: Result
  },
  data() {
    return {
      params: {
        createDateBegin: '',
        createDateEnd: '',
        // accordingSort: '',
        categoryUkid: '',
        stockId: '',
        productName: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.rangeDate {
  position: fixed;
  right: -4px;
  top: 111px;
  z-index: 999;
}
</style>
