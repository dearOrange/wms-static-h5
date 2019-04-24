<template>
  <div class="detail">
    <wms-header title="应付账单明细" back-icon>
      <template slot="left">
        <mt-button icon="back" @click="back"/>
      </template>
    </wms-header>
    <account-base-info/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/account/pay/detail/BaseInfo'
export default {
  name: 'AccountPayDetail',
  components: {
    AccountBaseInfo: BaseInfo
  },
  methods: {
    back() {
      this.$router.push('/owner/account/pay/list')
    }
  }
}
</script>
