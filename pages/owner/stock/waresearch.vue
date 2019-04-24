<template>
  <div>
    <wms-header title="库存查询"/>
    <Search :params="params"/>
    <WareFilter :filter="params"/>
    <WareResult :params="params"/>
  </div>
</template>

<script>
// import { cloneDeep } from 'lodash'
import Header from '@/components/share/Header'
// import WareTabs from '@/components/owner/stock/common/tabs'
import Search from '@/components/owner/stock/ware/Search'
import WareFilter from '@/components/owner/stock/ware/Filter'
import Result from '@/components/owner/stock/ware/result'

export default {
  name: 'WareSearch',
  components: {
    WmsHeader: Header,
    // WareTabs,
    Search,
    WareFilter,
    WareResult: Result
  },
  data() {
    return {
      params: {
        accordingSort: '',
        categoryUkid: '',
        stockId: '',
        productName: ''
      }
    }
  },
  methods: {
    // onTabsConfirm() {
    //   this.params = cloneDeep(this.params)
    //   // TODO
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
