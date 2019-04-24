<template>
  <div>
    <wms-header :title="`${editTypeText}采购退货单`"/>
    <BaseInfo :data="data"/>
    <GoodsList :data="data"/>
    <Receiver :data="data"/>
    <Remark :data="data"/>
    <AddupButton :data="data" @confirm="confirm"/>
  </div>
</template>

<script>
import { differenceBy, find } from 'lodash'
import BaseInfo from './BaseInfo'
import GoodsList from './GoodsList'
import Receiver from './Receiver'
import Remark from './Remark'
import AddupButton from './AddupButton'

import {
  create,
  update,
  getDetail as getCreatedData
} from '@/api/owner/repurchase'

export default {
  name: 'Container',
  components: {
    BaseInfo,
    GoodsList,
    Receiver,
    Remark,
    AddupButton
  },
  data() {
    return {
      isCreate: true,
      createdGoodsList: [],
      data: {
        supplierId: '',
        stockId: '',
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

  watch: {
    'data.supplierId': {
      handler(newID) {
        if (newID) {
          let { address, ownerCustomer } = this.$store.getters[
            'public/provider'
          ]
          this.$store.commit(
            'public/setReceiver',
            address
              ? {
                  name: address.contactName,
                  phone: address.mobile,
                  address: address.address,
                  district: [
                    address.provinceCode,
                    address.cityCode,
                    address.districtCode
                  ]
                }
              : null
          )

          if (ownerCustomer) {
            this.data.discount = ownerCustomer.discount
          }
        }
      }
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
          this.$store.commit('public/setProvider', {
            supplierId: data.supplierId,
            supplierName: data.supplierName
          })
          this.$store.commit('public/setDepot', {
            stockId: data.stockId,
            stockName: data.stockName
          })
          this.$store.commit('public/setReceiver', {
            name: data.receiverContactName,
            phone: data.receiverMobile,
            address: data.receiverAddress,
            district: [
              data.receiverProvinceCode,
              data.receiverCityCode,
              data.receiverDistrictCode
            ]
          })
          this.createdGoodsList = [...data.detailList]
          this.$store.commit(
            'public/setGoods',
            data.detailList.map(item => {
              return {
                ...item,
                count: item.backQty,
                unitPrice: item.refundUnitCost || 0
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
      ).map(item => item.backDetailUkid)

      let updateGoodsList = editedGoodsList.map(item => {
        let foundItem = find(createdGoodsList, createdItem => {
          return createdItem.productItemUkid === item.productItemUkid
        })
        return {
          ...item,
          ...(foundItem ? { backDetailUkid: foundItem.backDetailUkid } : {})
        }
      })
      return update({
        ...this.data,
        backUkid: this.$route.params.id,
        deleteDetailList: deletedIDs,
        detailList: updateGoodsList
      })
    },

    async confirm() {
      let { success } = await this.doSubmit()
      if (success) {
        this.$router.push('/owner/repurchase/list')
      }
    }
  }
}
</script>
