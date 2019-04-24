<template>
  <div>
    <wms-header :title="`${editTypeText}销售订单`"/>
    <BaseInfo>
      <ChooseDateCell v-model="data.orderDate"/>
      <ChooseCustomerCell @change="data.customerId = $event.customerId"/>
      <ChooseDepotCell @change="data.stockId = $event.stockId"/>
    </BaseInfo>
    <GoodsList :data="data"/>
    <Discounted :data="data"/>
    <Receiver :data="data"/>
    <Remark :data="data"/>
    <AddupButton :data="data" @confirm="confirm"/>
  </div>
</template>

<script>
import { differenceBy, find, isNumber } from 'lodash'
import ChooseDateCell from '@/components/share/ChooseDateCell'
import ChooseCustomerCell from '@/components/share/ChooseCustomerCell'
import ChooseDepotCell from '@/components/share/ChooseDepotCell'

import BaseInfo from './BaseInfo'
import GoodsList from './GoodsList'
import Discounted from './Discounted'
import Receiver from './Receiver'
import Remark from './Remark'
import AddupButton from './AddupButton'

import {
  create,
  update,
  getDetailOfBasic,
  getDetailOfGoods
} from '@/api/owner/order'

export default {
  name: 'Container',
  components: {
    ChooseDateCell,
    ChooseCustomerCell,
    ChooseDepotCell,
    BaseInfo,
    GoodsList,
    Discounted,
    Receiver,
    Remark,
    AddupButton
  },
  data() {
    return {
      isCreate: true,
      createdGoodsList: [],
      data: {
        discount: 1,
        orderDate: new Date(),
        customerId: '',
        stockId: '',
        reduceAmount: '0',
        remark: '',
        ordDetailList: []
      }
    }
  },

  computed: {
    editTypeText() {
      return this.isCreate ? '创建' : '修改'
    }
  },

  watch: {
    'data.customerId': {
      handler(newID) {
        if (newID) {
          let { address, ownerCustomer } = this.$store.getters[
            'public/customer'
          ]
          if (address) {
            this.$store.commit('public/setReceiver', {
              name: address.contactName,
              phone: address.mobile,
              address: address.address,
              district: [
                address.provinceCode,
                address.cityCode,
                address.districtCode
              ]
            })
          }

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
        let { success, data } = await this.fetch()
        if (success) {
          this.data.remark = data.remark
          this.data.orderDate = new Date(data.orderDate)
          this.data.reduceAmount = data.reduceAmount
          this.data.discount =
            data.baOwnerCustomer && data.baOwnerCustomer.discount
          if (!isNumber(this.data.discount)) {
            this.data.discount = 1
          }

          this.$store.commit('public/setCustomer', {
            customerId: data.customerId,
            customerName: data.customerName
          })
          this.$store.commit('public/setDepot', {
            stockId: data.stockId,
            stockName: data.stockName
          })
          this.initReceiver(data)
          this.createdGoodsList = [...data.ordDetailList]
          this.$store.commit(
            'public/setGoods',
            data.ordDetailList.map(item => {
              return {
                ...item,
                count: item.orderQty,
                unitPrice: item.unitPrice
              }
            })
          )
        }
      }
    },

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
    },

    initReceiver(data) {
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
    },
    doSubmit() {
      return this.isCreate ? this.doCreate() : this.doUpdate()
    },

    doCreate() {
      return create(this.data)
    },
    doUpdate() {
      let createdGoodsList = this.createdGoodsList
      let editedGoodsList = this.data.ordDetailList
      let deletedIDs = differenceBy(
        createdGoodsList,
        editedGoodsList,
        'productItemUkid'
      ).map(item => item.orderDetailUkid)

      let updateGoodsList = editedGoodsList.map(item => {
        let foundItem = find(createdGoodsList, createdItem => {
          return createdItem.productItemUkid === item.productItemUkid
        })
        return {
          ...item,
          ...(foundItem ? { orderDetailUkid: foundItem.orderDetailUkid } : {})
        }
      })
      return update({
        ...this.data,
        orderUkid: this.$route.params.id,
        delordDetailUkidList: deletedIDs,
        ordDetailList: updateGoodsList
      })
    },

    async confirm() {
      let { success } = await this.doSubmit()
      if (success) {
        this.$router.push('/owner/order/list')
      }
    }
  }
}
</script>
