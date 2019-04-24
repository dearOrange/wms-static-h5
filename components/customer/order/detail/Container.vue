<template>
  <div>
    <AsyncLoader :loader="fetch" @success="data = $event">
      <template slot-scope="orderData">
        <BaseInfo :data="orderData"/>
        <GoodsList :list="orderData.ordDetailList"/>
        <Receiver :data="orderData"/>
        <Remark :data="orderData"/>
      </template>
    </AsyncLoader>
    <AddupButton :data="data"/>
  </div>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import Receiver from '@/components/share/Receiver'
import Remark from '@/components/share/Remark'
import BaseInfo from '@/components/customer/order/common/BaseInfo'
import GoodsList from './GoodsList'
import AddupButton from './AddupButton'

import { getDetailOfBasic, getDetailOfGoods } from '@/api/owner/order'

export default {
  name: 'Container',
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
      data: {
        ordDetailList: []
      }
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
    }
  }
}
</script>
