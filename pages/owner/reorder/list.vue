<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <section slot="content">
      <wms-header title="销售退货列表">
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

import Search from '@/components/owner/reorder/list/Search'
import Filters from '@/components/owner/reorder/list/Filters'
import Result from '@/components/owner/reorder/list/Result'

export default {
  name: 'ReorderList',
  layout: 'owner.tabbar',
  components: {
    Result,
    Filters,
    Search
  },

  data() {
    return {
      query: {
        returnStatusList: [],
        customerId: '',
        stockId: '',
        createTimeBegin: '',
        createTimeEnd: '',
        productName: ''
      }
    }
  },
  beforeMount() {
    if (this.$route.params.data) {
      // this.query.pageNum = 1
      this.query = {
        ...this.query,
        returnStatusList: this.$route.params.data
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
  }
}
</script>
<style lang="scss" scoped>
.list {
  height: calc(100vh - 60px - 48px);
  overflow-y: auto;
}
</style>
