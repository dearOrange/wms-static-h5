<template>
  <Container @cancel="$emit('cancel')" @confirm="confirm">
    <Item title="收/付款日期">
      <template slot="bd">
        <DateRange
          :filters="filters"
          @start="filters.billDateBegin = $event"
          @end="filters.billDateEnd = $event"
        />
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
        <Customer v-model="filters.receiveSideId"/>
      </template>
    </Item>
    <Item v-if="!isShow" title="供应商">
      <template slot="bd">
        <Provider v-model="filters.receiveSideId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <!-- <Item title="结算类型">
      <template slot="bd">
        <SelectedBox v-model="filters.billType" :list="typeList"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>-->
  </Container>
</template>

<script>
import Container from '@/components/filters/Container'
import Item from '@/components/filters/Item'
import DateRange from '@/components/owner/account/bill/Picker'
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
      ]
      // typeList: [
      //   {
      //     label: '全部',
      //     type: ''
      //   },
      //   {
      //     label: '应付账单',
      //     type: 'FPB'
      //   },
      //   {
      //     label: '应收账单',
      //     type: 'FRB'
      //   }
      // ]
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
