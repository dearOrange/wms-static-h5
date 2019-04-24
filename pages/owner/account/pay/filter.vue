<template>
  <div>
    <wms-header title="应付账单列表" back-icon>
      <template slot="left">
        <mt-button icon="back" @click="back"/>
      </template>
    </wms-header>
    <account-result :list="list"/>
  </div>
</template>

<script>
import Result from '@/components/owner/account/pay/filter/result'
export default {
  name: 'PayFilter',
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
      this.$router.push('/owner/account/pay/list')
    }
  },
  methods: {
    back() {
      this.$router.push('/owner/account/pay/list')
    }
  }
}
</script>

<style>
</style>
