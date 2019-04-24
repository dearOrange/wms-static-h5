<template>
  <div>
    <wms-header :title="`${editTypeText}销售退货`"/>
    <BaseInfo>
      <ChooseDateCell v-model="data.returnDate" title="退货日期"/>
      <ChooseCustomerCell @change="data.customerId = $event.customerId"/>
      <ChooseDepotCell @change="data.stockId = $event.stockId"/>
    </BaseInfo>
    <GoodsList :data="data"/>
    <Receiver :data="data"/>
    <Remark :data="data"/>
    <AddupButton :data="data" @confirm="confirm"/>
  </div>
</template>

<script>
import { differenceBy, find } from 'lodash'
import ChooseDateCell from '@/components/share/ChooseDateCell'
import ChooseCustomerCell from '@/components/share/ChooseCustomerCell'
import ChooseDepotCell from '@/components/share/ChooseDepotCell'

import BaseInfo from './BaseInfo'
import GoodsList from './GoodsList'
import Receiver from './Receiver'
import Remark from './Remark'
import AddupButton from './AddupButton'

import {
  create,
  update,
  getDetailOfBasic,
  getDetailOfGoods
} from '@/api/owner/reorder'

export default {
  name: 'Container',
  components: {
    ChooseDateCell,
    ChooseCustomerCell,
    ChooseDepotCell,
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
        discount: 1,
        returnDate: new Date(),
        customerId: '',
        stockId: '',
        remark: '',
        returnDetailList: []
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
          this.data.returnDate = new Date(data.returnDate)
          this.$store.commit('public/setCustomer', {
            customerId: data.customerId,
            customerName: data.customerName
          })
          this.$store.commit('public/setDepot', {
            stockId: data.stockId,
            stockName: data.stockName
          })
          this.initReceiver(data)
          this.createdGoodsList = [...data.returnDetailList]
          this.$store.commit(
            'public/setGoods',
            data.returnDetailList.map(item => {
              return {
                ...item,
                count: item.returnQty,
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
      let editedGoodsList = this.data.returnDetailList
      let deletedIDs = differenceBy(
        createdGoodsList,
        editedGoodsList,
        'productItemUkid'
      ).map(item => item.returnDetailUkid)

      let updateGoodsList = editedGoodsList.map(item => {
        let foundItem = find(createdGoodsList, createdItem => {
          return createdItem.productItemUkid === item.productItemUkid
        })
        return {
          ...item,
          ...(foundItem ? { returnDetailUkid: foundItem.returnDetailUkid } : {})
        }
      })
      return update({
        ...this.data,
        returnUkid: this.$route.params.id,
        delosdDetailUkidList: deletedIDs,
        returnDetailList: updateGoodsList
      })
    },

    async confirm() {
      let { success } = await this.doSubmit()
      if (success) {
        this.$router.push('/owner/reorder/list')
      }
    }
  }
}
</script>
