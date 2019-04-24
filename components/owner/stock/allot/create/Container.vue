<template>
  <div>
    <BaseInfo :data="data"/>
    <Goods :data="data"/>
    <Remark :data="data"/>
    <AddupSave @confirm="confirm"/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/stock/allot/create/BaseInfo'
import Goods from '@/components/owner/stock/allot/create/Goods'
import Remark from '@/components/owner/stock/allot/create/Remark'
import AddupSave from '@/components/owner/stock/allot/create/AddupSave'

import { addAllot } from '@/api/owner/stock'

export default {
  name: 'Container',
  components: {
    BaseInfo,
    Goods,
    Remark,
    AddupSave
  },
  data() {
    return {
      remark: '',
      data: {
        fromStockId: '',
        toStockId: '',
        remark: '',
        stAllocationDetails: []
      }
    }
  },

  methods: {
    doSubmit() {
      return addAllot(this.data)
    },
    async confirm() {
      let { success } = await this.doSubmit()
      if (success) {
        this.$router.push('/owner/stock/allot/list')
      }
    }
  }
}
</script>
