<template>
  <Container @cancel="$emit('cancel')" @confirm="confirm">
    <Item title="日期">
      <template slot="bd">
        <DateRange @start="filters.createBegin = $event" @end="filters.createEnd = $event"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="调出仓">
      <template slot="bd">
        <Depot v-model="filters.fromStockId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="调入仓">
      <template slot="bd">
        <Depot v-model="filters.toStockId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Item title="调拨单状态(多选)">
      <template slot="bd">
        <Status v-model="filters.allocationStatusList" type="ALLOT"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
  </Container>
</template>

<script>
import Container from '@/components/filters/Container'
import Item from '@/components/filters/Item'
import Depot from '@/components/filters/Depot'
import DateRange from '@/components/filters/DateRange'
import Status from '@/components/filters/Status'
export default {
  name: 'BaseInfo',
  components: {
    Container,
    Item,
    Depot,
    DateRange,
    Status
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
      isShow: true
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
