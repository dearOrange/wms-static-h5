<template>
  <div>
    <wms-header :title="`${editTypeText}采购订单`"/>
    <BaseInfo :data="data"/>
    <GoodsList :data="data"/>
    <Discounted :data="data"/>
    <Remark :data="data"/>
    <AddupButton :data="data" @confirm="confirm"/>
  </div>
</template>

<script>
import { differenceBy, find } from 'lodash'
import BaseInfo from '@/components/owner/purchase/edit/BaseInfo'
import GoodsList from '@/components/owner/purchase/edit/GoodsList'
import Discounted from '@/components/owner/purchase/edit/Discounted'
import Remark from '@/components/owner/purchase/edit/Remark'
import AddupButton from '@/components/owner/purchase/edit/AddupButton'

import {
  create,
  update,
  getDetail as getCreatedData
} from '@/api/owner/purchase'

export default {
  name: 'Container',
  components: {
    BaseInfo,
    GoodsList,
    Discounted,
    Remark,
    AddupButton
  },
  data() {
    return {
      isCreate: true,
      createdGoodsList: [],
      data: {
        purchaseDate: '',
        supplierId: '',
        stockId: '',
        reduceAmount: 0,
        remark: '',
        detailList: []
      }
    }
  },

  computed: {
    editTypeText() {
      return this.isCreate ? '创建' : '修改'
    }
  },

  beforeMount() {
    this.init()
  },
  methods: {
    async init() {
      let { id } = this.$route.params
      if (id) {
        this.isCreate = false
        let { success, data } = await getCreatedData(id)
        if (success) {
          this.data.remark = data.remark
          this.data.purchaseDate = new Date(data.purchaseDate)
          this.data.reduceAmount = data.reduceAmount
          this.$store.commit('public/setProvider', {
            supplierId: data.supplierId,
            supplierName: data.supplierName
          })
          this.$store.commit('public/setDepot', {
            stockId: data.stockId,
            stockName: data.stockName
          })
          this.createdGoodsList = [...data.detailList]
          this.$store.commit(
            'public/setGoods',
            data.detailList.map(item => {
              return {
                ...item,
                count: item.purchaseQty,
                unitPrice: item.purchaseUnitCost
              }
            })
          )
        }
      }
    },

    doSubmit() {
      return this.isCreate ? this.doCreate() : this.doUpdate()
    },

    doCreate() {
      return create(this.data)
    },
    doUpdate() {
      let createdGoodsList = this.createdGoodsList
      let editedGoodsList = this.data.detailList
      let deletedIDs = differenceBy(
        createdGoodsList,
        editedGoodsList,
        'productItemUkid'
      ).map(item => item.purchaseDetailUkid)

      let updateGoodsList = editedGoodsList.map(item => {
        let foundItem = find(createdGoodsList, createdItem => {
          return createdItem.productItemUkid === item.productItemUkid
        })
        return {
          ...item,
          ...(foundItem
            ? { purchaseDetailUkid: foundItem.purchaseDetailUkid }
            : {})
        }
      })
      return update({
        ...this.data,
        purchaseUkid: this.$route.params.id,
        deleteDetailList: deletedIDs,
        detailList: updateGoodsList
      })
    },

    async confirm() {
      let { success } = await this.doSubmit()
      if (success) {
        this.$router.push('/owner/purchase/list')
      }
    }
  }
}
</script>
