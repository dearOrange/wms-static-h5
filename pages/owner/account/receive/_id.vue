<template>
  <div class="detail">
    <wms-header title="应收账单明细" back-icon>
      <template slot="left">
        <mt-button icon="back" @click="back"/>
      </template>
    </wms-header>
    <account-base-info/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/account/receive/detail/BaseInfo'
export default {
  name: 'AccountReceiveDetail',
  components: {
    AccountBaseInfo: BaseInfo
  },
  methods: {
    back() {
      this.$router.push('/owner/account/receive/list')
    }
  }
}
</script>
