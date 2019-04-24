<template>
  <div class="detail">
    <wms-header title="仓库调拨单详情"/>
    <BaseInfo :data="data"/>
    <Goods :data="data"/>
    <Remark :data="data"/>
    <AddupSave :data="data" :list="data" @confirm="confirm"/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/stock/allot/detail/BaseInfo'
import Remark from '@/components/owner/stock/allot/detail/Remark'
import Goods from '@/components/owner/stock/allot/detail/Goods'
import AddupSave from '@/components/owner/stock/allot/detail/AddupSave'
import { MessageBox } from 'mint-ui'

import { getAllotDetail, changeAllot } from '@/api/owner/stock'

export default {
  name: 'StockDetail',
  components: {
    BaseInfo,
    Goods,
    Remark,
    AddupSave
  },
  data() {
    return {
      data: {}
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    async init() {
      let { success, data } = await getAllotDetail(this.$route.params.id)
      if (success) {
        this.data = { ...data }
        this.$store.commit(
          'public/setGoods',
          this.data.stAllocationDetails.map(item => {
            return {
              ...item,
              count: item.allocationQty,
              unitPrice: item.perUnitCost
            }
          })
        )
      }
    },
    async confirm() {
      let { success, msg } = await changeAllot(this.data)
      if (success) {
        MessageBox.alert('修改成功！').then(action => {
          this.$router.push('/owner/stock/allot/list')
        })
      } else {
        MessageBox({
          title: '提示',
          message: msg || '修改失败',
          showCancelButton: true
        })
      }
    }
  }
}
</script>
