<template>
  <section class="list">
    <wms-header title="供应商信息" back-icon>
      <template slot="left">
        <mt-button icon="back" @click="back"/>
      </template>
    </wms-header>
    <wms-whitespace size="10"/>
    <basics-search :params="params"/>
    <wms-whitespace size="10"/>
    <basics-result :params="params"/>
  </section>
</template>

<script>
import Search from '@/components/owner/basics/provider/list/Search'
import Result from '@/components/owner/basics/provider/list/result'

export default {
  name: 'ProviderList',
  components: {
    BasicsResult: Result,
    BasicsSearch: Search
  },
  data() {
    return {
      params: {
        supplier: {
          supplierName: ''
        }
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
