<template>
  <div class="item">
    <div class="sale--title">{{ dateTime }}</div>
    <ul class="sale--list">
      <li>
        <span>期初</span>
        <span>{{ data.beginInventoryQty }}</span>
      </li>
      <li>
        <span>入库</span>
        <span>{{ data.prReceiveQty }}</span>
      </li>
      <li>
        <span>出库</span>
        <span>{{ data.outstockQty }}</span>
      </li>
      <li>
        <span>调整</span>
        <span>{{ data.adjustQty }}</span>
      </li>
      <li>
        <span>期末</span>
        <span>{{ data.endInventoryQty }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    dateTime() {
      if (this.data.date) {
        return this.$format(this.data.date, 'YYYY-MM-DD')
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sale--title {
  padding-top: 10px;
}
.sale--list {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  & > li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
