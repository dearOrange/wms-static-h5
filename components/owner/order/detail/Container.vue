<template>
  <div>
    <AsyncLoader :loader="fetch" @success="data = $event">
      <template slot-scope="orderData">
        <BaseInfo :data="orderData"/>
        <GoodsList :list="orderData.ordDetailList" :is-confirm="isConfirm"/>
        <Receiver :data="orderData"/>
        <Remark :data="orderData"/>
      </template>
    </AsyncLoader>
    <AddupButton :data="data" :is-confirm="isConfirm"/>
  </div>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import Receiver from '@/components/share/Receiver'
import Remark from '@/components/share/Remark'
import BaseInfo from '@/components/owner/order/common/BaseInfo'
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

  computed: {
    isConfirm() {
      return this.data.orderStatus === 600 || this.data.orderStatus === 550
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
