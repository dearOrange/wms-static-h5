<template>
  <Container
    @cancel="$emit('cancel')"
    @confirm="confirm"
  >
    <Item title="日期">
      <template slot="bd">
        <DateRange
          @start="filters.createTimeBegin = $event"
          @end="filters.createTimeEnd = $event"
        />
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)" />
    <Item title="客户">
      <template slot="bd">
        <Customer v-model="filters.customerId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)" />
    <Item title="仓库">
      <template slot="bd">
        <Depot v-model="filters.stockId"/>
      </template>
    </Item>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)" />
    <Item title="订单状态(多选)">
      <template slot="bd">
        <Status v-model="filters.orderStatusList" type="ORDER"/>
      </template>
    </Item>
  </Container>
</template>
<script>
import Container from '@/components/filters/Container'
import Item from '@/components/filters/Item'
import DateRange from '@/components/filters/DateRange'
import Customer from '@/components/filters/Customer'
import Depot from '@/components/filters/Depot'
import Status from '@/components/filters/Status'
export default {
  name: 'Filters',
  components: {
    Container,
    Item,
    DateRange,
    Customer,
    Depot,
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
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
$buttonsHeight: 60px;

.filters {
  position: relative;
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding-bottom: $buttonsHeight;
}
.main-content {
  height: 100%;
  overflow-y: auto;
}
.buttons {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  height: $buttonsHeight;
  width: 100%;
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 auto;
    &.cancel {
      color: rgba(38, 162, 255, 1);
      // box-shadow: inset 0 0 2px 1px rgba(190, 190, 190, 0.5);
      background-color: rgba(38, 162, 255, 0.3);
    }
    &.confirm {
      background-color: rgba(38, 162, 255, 1);
      color: #fff;
    }
  }
}
</style>
