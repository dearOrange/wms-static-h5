<template>
  <ul class="sale--list">
    <li>
      <span>期初</span>
      <span class="sale--num">{{ data.inventoryQtySum }}</span>
    </li>
    <li>
      <span>入库</span>
      <span class="sale--num">{{ data.receiveQtySum }}</span>
    </li>
    <li>
      <span>出库</span>
      <span class="sale--num">{{ data.outstockQtySum }}</span>
    </li>
    <li>
      <span>调整</span>
      <span class="sale--num">{{ data.adjustQtySum }}</span>
    </li>
    <li>
      <span>期末</span>
      <span class="sale--num">{{ data.endInventoryQtySum }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Bottom',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.sale--list {
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  border-top: 1px solid #333;
  & > li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: 900;
    & > .sale--num {
      color: #f00;
    }
  }
}
</style>
