<template>
  <Container @cancel="$emit('cancel')" @confirm="confirm">
    <Item title="日期">
      <template slot="bd">
        <DateRange @start="filters.billDateBegin = $event" @end="filters.billDateEnd = $event"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="对方类型">
      <template slot="bd">
        <SelectedBox v-model="filters.otherSideType" :list="customerList"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item v-if="isShow" title="客户">
      <template slot="bd">
        <Customer v-model="filters.paymentSideId"/>
      </template>
    </Item>
    <Item v-if="!isShow" title="供应商">
      <template slot="bd">
        <Provider v-model="filters.paymentSideId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="结算类型">
      <template slot="bd">
        <SelectedBox v-model="filters.relatedType" :list="typeList"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
  </Container>
</template>

<script>
import Container from '@/components/filters/Container'
import Item from '@/components/filters/Item'
import DateRange from '@/components/filters/DateRange'
import Provider from '@/components/filters/Provider'
import Customer from '@/components/filters/Customer'
import SelectedBox from '@/components/owner/account/common/select'
export default {
  name: 'BaseInfo',
  components: {
    Container,
    Item,
    DateRange,
    Provider,
    Customer,
    SelectedBox
  },
  props: {
    filters: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShow: true,
      customerList: [
        {
          label: '客户',
          type: 'CR'
        },
        {
          label: '供应商',
          type: 'SR'
        }
      ],
      typeList: [
        {
          label: '全部',
          type: ''
        },
        {
          label: '采购退货',
          type: 'PB'
        },
        {
          label: '销售订单',
          type: 'SO'
        }
      ]
    }
  },
  watch: {
    'filters.otherSideType': function(newVal, oldVal) {
      if (newVal === 'CR') {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
