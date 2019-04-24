<template>
  <div>
    <BaseInfo :data="data"/>
    <Goods :data="data"/>
    <Remark :data="data"/>
    <AddupSave @confirm="confirm"/>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/stock/adjust/create/BaseInfo'
import Goods from '@/components/owner/stock/adjust/create/Goods'
import Remark from '@/components/owner/stock/adjust/create/Remark'
import AddupSave from '@/components/owner/stock/adjust/create/AddupSave'
import { MessageBox } from 'mint-ui'
import { addAdjust } from '@/api/owner/stock'

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
        stockId: '',
        remark: '',
        detailExpandList: []
      }
    }
  },

  methods: {
    doSubmit() {
      return addAdjust(this.data)
    },
    async confirm() {
      let { success, msg } = await this.doSubmit()
      if (success) {
        MessageBox.alert('添加成功！').then(action => {
          this.$router.push('/owner/stock/adjust/list')
        })
      } else {
        MessageBox({
          title: '提示',
          message: msg,
          showCancelButton: true
        })
      }
    }
  }
}
</script>
