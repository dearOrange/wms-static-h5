<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <section slot="content">
      <wms-header title="采购订单列表">
        <template slot="right">
          <span @click="toggleDrawer(true)">查询条件</span>
        </template>
      </wms-header>
      <div class="list sc">
        <wms-whitespace size="10"/>
        <Search :query="query"/>
        <wms-whitespace size="10"/>
        <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
        <Result :query="query"/>
      </div>
    </section>
    <template slot="drawer">
      <Filters :filters="query" @confirm="filtersConfirm" @cancel="toggleDrawer(false)"/>
    </template>
  </wms-drawer-layout>
</template>

<script>
import { cloneDeep } from 'lodash'

import Search from '@/components/owner/purchase/list/Search'
import Filters from '@/components/owner/purchase/list/Filters'
import Result from '@/components/owner/purchase/list/Result'

export default {
  name: 'PurchaseList',
  layout: 'owner.tabbar',
  components: {
    Result,
    Filters,
    Search
  },

  data() {
    return {
      query: {
        purchaseStatusList: [],
        supplierId: '',
        stockId: '',
        startTime: '',
        endTime: '',
        keywords: ''
      }
    }
  },
  beforeMount() {
    if (this.$route.params.data) {
      // this.query.pageNum = 1
      this.query = {
        ...this.query,
        purchaseStatusList: this.$route.params.data
      }
    }
  },
  methods: {
    toggleDrawer(visible) {
      this.$refs.listDrawer.toggle(visible)
    },

    filtersConfirm() {
      this.query = cloneDeep(this.query)
      this.toggleDrawer(false)
    }
    // onSearchChange(keywords) {
    //   this.query = {
    //     ...this.query,
    //     keywords
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.list {
  height: calc(100vh - 60px - 48px);
  overflow-y: auto;
}
</style>
