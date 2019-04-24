<template>
  <div>
    <wms-header :title="`${editTypeText}订单`"/>
    <BaseInfo>
      <ChooseDateCell v-model="data.orderDate"/>
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

import BaseInfo from './BaseInfo'
import GoodsList from './GoodsList'
import Receiver from './Receiver'
import Remark from './Remark'
import AddupButton from './AddupButton'

import {
  submit,
  save,
  getDetailOfBasic,
  getDetailOfGoods,
  getCustomerAddress
} from '@/api/customer/order'

export default {
  name: 'Container',
  components: {
    ChooseDateCell,
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
        orderDate: new Date(),
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
          this.setReceiver({
            name: data.receiverContactName,
            phone: data.receiverMobile,
            address: data.receiverAddress,
            district: [
              data.receiverProvinceCode,
              data.receiverCityCode,
              data.receiverDistrictCode
            ]
          })
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
      } else {
        let { success, data } = await getCustomerAddress()
        if (success) {
          this.setReceiver({
            name: data.contactName,
            phone: data.mobile,
            address: data.address,
            district: [data.provinceCode, data.cityCode, data.districtCode]
          })
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
          : {}
      }
    },

    setReceiver(data) {
      this.$store.commit('public/setReceiver', data)
    },
    doSubmit(isSave) {
      return this.isCreate ? this.doCreate(isSave) : this.doUpdate(isSave)
    },

    doCreate(isSave = true) {
      return isSave ? save(this.data) : submit(this.data)
    },
    doUpdate(isSave = true) {
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

      let updateParams = {
        ...this.data,
        orderUkid: this.$route.params.id,
        delordDetailUkidList: deletedIDs,
        ordDetailList: updateGoodsList
      }
      return isSave ? save(updateParams) : submit(updateParams)
    },

    async confirm(isSave) {
      let { success } = await this.doSubmit(isSave)
      if (success) {
        this.$router.push('/customer/order/list')
      }
    }
  }
}
</script>
