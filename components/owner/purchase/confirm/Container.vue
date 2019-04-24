<template>
  <div>
    <wms-header title="采购订单确认收货"/>
    <AsyncLoader :loader="fetch" @success="goods = $event.detailList">
      <template slot-scope="data">
        <BaseInfo :data="data"/>
        <GoodsList :list="data.detailList" @count="onCountUpdate"/>
        <Discounted :data="data"/>
        <Remark :data="data"/>
      </template>
    </AsyncLoader>
    <AddupButton :list="goods" @confirm="confirm"/>
  </div>
</template>

<script>
import { unionBy } from 'lodash'

import AsyncLoader from '@/components/share/async-loader'
import BaseInfo from '@/components/owner/purchase/common/BaseInfo'
import Discounted from '@/components/share/Discounted'
import Remark from '@/components/share/Remark'
import GoodsList from './GoodsList'
import AddupButton from './AddupButton'

import { getDetail, confirm } from '@/api/owner/purchase'

export default {
  name: 'Confirm',
  components: {
    AsyncLoader,
    BaseInfo,
    GoodsList,
    Discounted,
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
    onCountUpdate(item) {
      this.updateGoodsByItem(item)
    },
    updateGoodsByItem(item) {
      this.goods = unionBy([item], this.goods, 'purchaseDetailUkid')
    },
    confirm() {
      this.doConfirmRecevied()
    },

    async doConfirmRecevied() {
      let { success } = await confirm({
        purchaseUkid: this.$route.params.id,
        detailList: this.goods.map(({ purchaseDetailUkid, count }) => ({
          purchaseDetailUkid,
          receivedQty: count
        }))
      })
      if (success) {
        this.$router.push('/owner/purchase/list')
      }
    }
  }
}
</script>
