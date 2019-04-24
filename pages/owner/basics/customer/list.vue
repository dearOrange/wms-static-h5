<template>
  <section class="list">
    <wms-header title="客户信息" back-icon>
      <template slot="left">
        <mt-button icon="back" @click="back"/>
      </template>
    </wms-header>
    <wms-whitespace size="10"/>
    <basics-search :params="params"/>
    <wms-whitespace size="6" bgcolor="rgba(0,0,0,.15)"/>
    <basics-result :params="params"/>
  </section>
</template>

<script>
import Search from '@/components/owner/basics/customer/list/Search'
import Result from '@/components/owner/basics/customer/list/result'

export default {
  name: 'CustomerList',
  components: {
    BasicsResult: Result,
    BasicsSearch: Search
  },
  data() {
    return {
      params: {
        customerName: ''
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
