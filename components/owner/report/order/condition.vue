<template>
  <Container @cancel="$emit('cancel')" @confirm="confirm">
    <Item title="日期">
      <template slot="bd">
        <DateRange
          :filters="filters"
          @start="filters.createTimeBegin = $event"
          @end="filters.createTimeEnd = $event"
        />
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="客户">
      <template slot="bd">
        <Customer v-model="filters.customerId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="业务类型">
      <template slot="bd">
        <SelectedBox v-model="filters.businessType" :list="parchaseList"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
  </Container>
</template>

<script>
import Container from '@/components/filters/Container'
import Item from '@/components/filters/Item'
import Customer from '@/components/filters/Customer'
import DateRange from '@/components/owner/report/order/Picker'
// import DateRange from '@/components/filters/DateRange'
import SelectedBox from '@/components/owner/report/select'
export default {
  name: 'BaseInfo',
  components: {
    Container,
    Item,
    Customer,
    DateRange,
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
      parchaseList: [
        {
          label: '销售出库',
          type: 'order'
        },
        {
          label: '销售退货',
          type: 'return'
        }
      ]
    }
  },
  watch: {},
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
