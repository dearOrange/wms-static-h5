<template>
  <section class="list">
    <wms-header title="商品分类信息" back-icon>
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
import Search from '@/components/owner/basics/classify/list/Search'
import Result from '@/components/owner/basics/classify/list/result'

export default {
  name: 'ClassifyList',
  components: {
    BasicsResult: Result,
    BasicsSearch: Search
  },
  data() {
    return {
      params: {
        categoryName: ''
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
