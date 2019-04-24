<template>
  <div class="wms__sum">
    <div>
      <p>库存总金额</p>
      <p class="sum_num">{{ dataPrice | CNY }}</p>
    </div>
    <div>
      <p>库存总数</p>
      <p class="sum_num">{{ dataNum }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockBottom',
  props: {
    dataNum: {
      type: Number,
      default: 0
    },
    dataPrice: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.wms__sum {
  width: 100%;
  padding: 10px 20px;
  background: #fff;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-weight: 900;
    & > .sum_num {
      color: #f00;
    }
  }
}
</style>
