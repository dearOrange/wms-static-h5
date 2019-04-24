<template>
  <div class="home--head">
    <div class="home--title">今日发货数据</div>
    <div class="home--count border">
      <Rang :data="list.shippedQtySum" label="发货数量"/>
      <Rang :data="list.shippedAmountSum" label="发货金额"/>
    </div>
    <div class="home--count">
      <Item
        :count="list.orderQtySum"
        :money="list.saleAmountSum | CNY"
        title="今日订货"
        label="订货数量"
        amount="订货金额"
      />
      <Item
        :count="list.receivedQtySum"
        :money="list.receivedAmountSum | CNY"
        title="今日收货"
        label="收货数量"
        amount="收货金额"
      />
      <Item
        :count="list.outstockShippedQtySum"
        :money="list.outstockShippedAmountSum | CNY"
        title="本月发货"
        label="发货数量"
        amount="发货金额"
        borderRight
      />
    </div>
  </div>
</template>

<script>
import Rang from './rang'
import Item from './item'
export default {
  name: 'DataBase',
  components: {
    Rang,
    Item
  },
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home--head {
  width: 100vw;
  padding: 0 10px 10px;
  > .home--title {
    text-align: center;
    padding: 10px 0 0;
    font-size: 18px;
    color: #fff;
  }
  > .home--count {
    display: flex;
  }
  > .border {
    padding: 10px 20px;
    justify-content: space-around;
  }
}
</style>
