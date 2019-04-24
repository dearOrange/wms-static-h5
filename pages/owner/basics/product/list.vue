<template>
  <section class="list">
    <wms-header title="商品信息" back-icon>
      <template slot="left">
        <mt-button icon="back" @click="back"/>
      </template>
    </wms-header>
    <basics-filter :filter="params"/>
    <wms-whitespace size="10"/>
    <basics-search :params="params"/>
    <wms-whitespace size="10"/>
    <basics-result :params="params"/>
  </section>
</template>

<script>
import Search from '@/components/owner/basics/product/list/Search'
import Result from '@/components/owner/basics/product/list/result'
import Filter from '@/components/owner/basics/product/list/Filter'

export default {
  name: 'ProductList',
  components: {
    BasicsResult: Result,
    BasicsSearch: Search,
    BasicsFilter: Filter
  },
  data() {
    return {
      params: {
        productItemCode: '',
        categoryUkid: '',
        saleStatus: '',
        status: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.push('/owner/workbench')
    }
  }
}
</script>
