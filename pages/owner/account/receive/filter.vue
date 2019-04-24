<template>
  <div>
    <wms-header title="应收账单列表"/>
    <account-result :list="list"/>
  </div>
</template>

<script>
import Result from '@/components/owner/account/receive/filter/result'
export default {
  name: 'ReceiveFilter',
  components: {
    AccountResult: Result
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    if (this.$route.params.data) {
      this.list = this.$route.params.data
    } else {
      this.$router.push('/owner/account/receive/list')
    }
  }
}
</script>

<style>
</style>
