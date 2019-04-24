<template>
  <Container @cancel="$emit('cancel')" @confirm="confirm">
    <Item title="日期">
      <template slot="bd">
        <DateRange
          :filters="filters"
          @start="filters.startTime = $event"
          @end="filters.endTime = $event"
        />
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="供应商">
      <template slot="bd">
        <Customer v-model="filters.supplierId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="业务类型">
      <template slot="bd">
        <SelectedBox v-model="filters.purchaseType" :list="parchaseList"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
  </Container>
</template>

<script>
import Container from '@/components/filters/Container'
import Item from '@/components/filters/Item'
import Customer from '@/components/filters/Customer'
import DateRange from '@/components/owner/report/purchase/Picker'
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
          label: '采购入库',
          type: 'purchase'
        },
        {
          label: '采购退货',
          type: 'purchaseBack'
        }
      ]
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
