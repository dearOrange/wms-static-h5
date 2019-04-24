<template>
  <div>
    <wms-header title="销售单确认发货"/>
    <AsyncLoader :loader="fetch" @success="goodsList = $event.ordDetailList">
      <template slot-scope="data">
        <BaseInfo :data="data"/>
        <GoodsList :list="data.ordDetailList" @count="onCountUpdate"/>
        <Receiver :data="data"/>
        <Remark :data="data"/>
      </template>
    </AsyncLoader>
    <AddupButton :list="goodsList" @confirm="confirm"/>
  </div>
</template>

<script>
import { unionBy } from 'lodash'

import AsyncLoader from '@/components/share/async-loader'
import Receiver from '@/components/share/Receiver'
import Remark from '@/components/share/Remark'
import BaseInfo from '@/components/customer/order/common/BaseInfo'
import GoodsList from './GoodsList'
import AddupButton from './AddupButton'

import { getDetailOfBasic, getDetailOfGoods, confirm } from '@/api/owner/order'

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
      goodsList: []
    }
  },
  methods: {
    async fetch() {
      let { id, data: basicDataFromList } = this.$route.params
      let basicData = basicDataFromList
      let success = true
      if (!basicData) {
        let { data, success: basicSuccess } = await getDetailOfBasic(id)
        if (basicSuccess) {
          basicData = data
        }
        success = basicSuccess
      }
      let {
        data: ordDetailList,
        success: listSuccess
      } = await getDetailOfGoods(id)
      success = success && listSuccess
      return {
        success,
        data: success
          ? {
              ...basicData,
              ordDetailList
            }
          : null
      }
    },
    onCountUpdate(item) {
      this.updateGoodsByItem(item)
    },
    updateGoodsByItem(item) {
      this.goodsList = unionBy([item], this.goodsList, 'orderDetailUkid')
    },
    confirm() {
      this.doConfirmShip()
    },

    async doConfirmShip() {
      let { success } = await confirm({
        orderUkid: this.$route.params.id,
        ordDetailList: this.goodsList.map(({ orderDetailUkid, count }) => ({
          orderDetailUkid,
          shippedQty: count
        }))
      })
      if (success) {
        this.$router.push('/customer/order/list')
      }
    }
  }
}
</script>
