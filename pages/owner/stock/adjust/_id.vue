<template>
  <div class="detail">
    <wms-header title="库存调整单详情"/>
    <BaseInfo :data="data"/>
    <Goods :data="data" :data-status="dataStatus"/>
    <Remark :data="data" :data-status="dataStatus"/>
    <AddupSave :data-status="dataStatus === 10" :list="data" @confirm="confirm"/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/stock/adjust/detail/BaseInfo'
import Remark from '@/components/owner/stock/adjust/detail/Remark'
import Goods from '@/components/owner/stock/adjust/detail/Goods'
import AddupSave from '@/components/owner/stock/adjust/detail/AddupSave'
import { MessageBox } from 'mint-ui'

import { getAdjustDetail, changeAdjust } from '@/api/owner/stock'

export default {
  name: 'AdjustDetail',
  components: {
    BaseInfo,
    Goods,
    Remark,
    AddupSave
  },
  data() {
    return {
      dataStatus: 10,
      data: {}
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    async init() {
      let { success, data } = await getAdjustDetail(this.$route.params.id)
      if (success) {
        this.data = { ...data }
        this.dataStatus = data.adjustStatus
        this.$store.commit(
          'public/setGoods',
          this.data.stAdjustDetails.map(item => {
            return {
              ...item,
              count: item.adjustQty,
              unitPrice: item.perUnitCost
            }
          })
        )
      }
    },
    async confirm() {
      let { success, msg } = await changeAdjust(this.data)
      if (success) {
        MessageBox.alert('修改成功！').then(action => {
          this.$router.push('/owner/stock/adjust/list')
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
