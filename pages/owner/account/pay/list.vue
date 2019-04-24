<template>
  <wms-drawer-layout ref="listDrawer" reverse :enable="false" @mask-click="toggleDrawer(false)">
    <div slot="content">
      <wms-header title="应付账单列表" back-icon>
        <template slot="left">
          <mt-button icon="back" @click="back"/>
        </template>
        <template slot="right">
          <span @click="toggleDrawer(true)">条件查询</span>
        </template>
      </wms-header>
      <account-result :params="params"/>
    </div>
    <template slot="drawer">
      <Search :filters="params" @confirm="filtersConfirm" @cancel="toggleDrawer(false)"/>
    </template>
  </wms-drawer-layout>
</template>

<script>
import { cloneDeep } from 'lodash'
import Search from '@/components/owner/account/pay/list/search'
import Result from '@/components/owner/account/pay/list/result'
export default {
  name: 'AccountPay',
  components: {
    AccountResult: Result,
    Search
  },
  data() {
    return {
      params: {
        billDateBegin: '',
        billDateEnd: '',
        otherSideType: '',
        paymentSideId: '',
        relatedType: '',
        statusList: []
      }
    }
  },
  beforeMount() {
    if (this.$route.params.data) {
      // this.params.pageNum = 1
      this.params = {
        ...this.params,
        statusList: this.$route.params.data
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
