<template>
  <section class="log">
    <wms-header title="操作日志"/>
    <AsyncLoader :loader="fetch">
      <template slot-scope="data">
        <Summary/>
        <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
        <List :list="data"/>
      </template>
    </AsyncLoader>
  </section>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import List from '@/components/public/logger/List'
import Summary from '@/components/public/logger/Summary'
import { getLogs } from '@/api/public'
export default {
  name: 'Log',
  components: {
    AsyncLoader,
    Summary,
    List
  },
  methods: {
    fetch() {
      return getLogs(this.$route.params.id, this.$route.query.tb)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
