<template>
  <div>
    <wms-header title="采购退单确认发货"/>
    <AsyncLoader :loader="fetch" @success="goods = $event.detailList">
      <template slot-scope="data">
        <BaseInfo :data="data"/>
        <GoodsList :list="data.detailList"/>
        <Receiver :data="data"/>
        <Remark :data="data"/>
      </template>
    </AsyncLoader>
    <AddupButton :list="goods" @confirm="confirm"/>
  </div>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import BaseInfo from '@/components/owner/repurchase/common/BaseInfo'
import Receiver from '@/components/share/Receiver'
import Remark from '@/components/share/Remark'
import GoodsList from '@/components/owner/repurchase/confirm/GoodsList'
import AddupButton from '@/components/owner/repurchase/confirm/AddupButton'

import { getDetail, confirm } from '@/api/owner/repurchase'

export default {
  name: 'Confirm',
  components: {
    AsyncLoader,
    BaseInfo,
    GoodsList,
    Receiver,
    Remark,
    AddupButton
  },
  data() {
    return {
      goods: []
    }
  },
  methods: {
    fetch() {
      return getDetail(this.$route.params.id)
    },
    confirm() {
      this.doConfirmShipped()
    },
    async doConfirmShipped() {
      let { success } = await confirm({
        backUkid: this.$route.params.id
      })
      if (success) {
        this.$router.push('/owner/repurchase/list')
      }
    }
  }
}
</script>
