<template>
  <div>
    <AsyncLoader :loader="fetch" @success="data = $event">
      <template slot-scope="orderData">
        <BaseInfo :data="orderData"/>
        <GoodsList :list="orderData.returnDetailList" :is-confirm="isConfirm"/>
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
import BaseInfo from '@/components/owner/reorder/common/BaseInfo'
import GoodsList from './GoodsList'
import AddupButton from './AddupButton'

import { getDetailOfBasic, getDetailOfGoods } from '@/api/owner/reorder'

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
        returnDetailList: []
      }
    }
  },
  computed: {
    isConfirm() {
      return this.data.returnStatus === 600 || this.data.returnStatus === 550
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
        data: returnDetailList,
        success: listSuccess
      } = await getDetailOfGoods(id)
      success = success && listSuccess
      return {
        success,
        data: success
          ? {
              ...basicData,
              returnDetailList
            }
          : null
      }
    }
  }
}
</script>
