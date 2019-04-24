<template>
  <AsyncLoader :loader="fetch" @success="data = $event">
    <template slot-scope="purchaseData">
      <BaseInfo :data="purchaseData"/>
      <GoodsList :list="purchaseData.detailList" :is-confirm="isConfirm"/>
      <Discounted :data="purchaseData"/>
      <Remark :data="purchaseData"/>
      <AddupButton :list="purchaseData.detailList" :discount="purchaseData.reduceAmount" :is-confirm="isConfirm"/>
    </template>
  </AsyncLoader>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import BaseInfo from '@/components/owner/purchase/common/BaseInfo'
import Discounted from '@/components/share/Discounted'
import Remark from '@/components/share/Remark'
import GoodsList from './GoodsList'
import AddupButton from './AddupButton'

import { getDetail } from '@/api/owner/purchase'

export default {
  name: 'Container',
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
      data: {}
    }
  },
  computed: {
    isConfirm() {
      return (
        this.data.purchaseStatus === 200 || this.data.purchaseStatus === 500
      )
    }
  },
  methods: {
    fetch() {
      return getDetail(this.$route.params.id)
    }
  }
}
</script>
