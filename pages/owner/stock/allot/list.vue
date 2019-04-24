<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <div slot="content" class="list">
      <wms-header title="仓库调拨单列表" back-icon>
        <template slot="left">
          <mt-button icon="back" @click="back"/>
        </template>
        <template slot="right">
          <span @click="toggleDrawer(true)">条件查询</span>
        </template>
      </wms-header>
      <Search :params="params"/>
      <allot-result :params="params"/>
    </div>
    <template slot="drawer">
      <Filters :filters="params" @confirm="filtersConfirm" @cancel="toggleDrawer(false)"/>
    </template>
  </wms-drawer-layout>
</template>

<script>
import { cloneDeep } from 'lodash'
import Search from '@/components/owner/stock/allot/list/search'
import Filters from '@/components/owner/stock/allot/list/Filters'
import AllotResult from '@/components/owner/stock/allot/list/result'

export default {
  name: 'Allot',
  components: {
    AllotResult,
    Search,
    Filters
  },
  data() {
    return {
      params: {
        createBegin: '',
        createEnd: '',
        allocationStatusList: [],
        fromStockId: '',
        toStockId: '',
        currency: ''
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
    },
    back() {
      this.$router.push('/owner/workbench')
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
