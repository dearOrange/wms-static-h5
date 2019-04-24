<template>
  <div class="detail">
    <wms-header title="调拨单确认收货"/>
    <BaseInfo :data="data"/>
    <Goods :data="data"/>
    <!-- <Receiver :data="data"/> -->
    <Remark :data="data"/>
    <AddupSave :list="data" @confirm="confirm"/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/stock/allot/take/BaseInfo'
// import Receiver from '@/components/owner/stock/allot/take/Receiver'
import Remark from '@/components/owner/stock/allot/take/Remark'
import Goods from '@/components/owner/stock/allot/take/Goods'
import AddupSave from '@/components/owner/stock/allot/take/AddupSave'
import { MessageBox } from 'mint-ui'

import { getAllotDetail, fromCheckAllot } from '@/api/owner/stock'

export default {
  name: 'StockDetail',
  components: {
    BaseInfo,
    Goods,
    // Receiver,
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
              count: item.receiveQty
            }
          })
        )
      }
    },
    async confirm() {
      let { success, msg } = await fromCheckAllot(this.data)
      if (success) {
        MessageBox.alert('收货成功！').then(action => {
          this.$router.push('/owner/stock/allot/list')
        })
      } else {
        MessageBox({
          title: '提示',
          message: msg || '收货失败',
          showCancelButton: true
        })
      }
    }
  }
}
</script>
