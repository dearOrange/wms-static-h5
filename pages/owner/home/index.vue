<template>
  <section class="list">
    <div class="bg">
      <HomeSearch class="home-search"/>
      <data-base-result :list="list"/>
    </div>
    <wms-whitespace size="10"/>
    <SaleResult :list="list.orderList"/>
    <PurchaseResult :list="list.purchaseList"/>
  </section>
</template>

<script>
import HomeSearch from '@/components/owner/home/Search'
import DataBaseResult from '@/components/owner/home/database/result'
import SaleResult from '@/components/owner/home/sale/Result'
import PurchaseResult from '@/components/owner/home/purchase/Result'
import { fetchList } from '@/api/owner/home'

export default {
  name: 'Home',
  layout: 'owner.tabbar',
  components: {
    SaleResult,
    DataBaseResult,
    HomeSearch,
    PurchaseResult
  },
  data() {
    return {
      list: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let { success, data } = await fetchList()
      if (success) {
        this.list = data
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home-search {
  padding: 10px;
}
.bg {
  width: 100vw;
  background: url('/images/bg.png') no-repeat center center;
  background-size: cover;
}
</style>
