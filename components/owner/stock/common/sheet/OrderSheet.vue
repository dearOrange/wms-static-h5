<template>
  <div class="order-sheet">
    <div class="layer"/>
    <div class="content">
      <div class="sheet--hd">
        <span>计划数</span>
        <span>单价</span>
        <span>金额</span>
        <!-- 当 购单状态为部分收货或者全部收货 显示 -->
        <!-- <span>已收货数</span> -->
      </div>
      <wms-whitespace size="1" bgcolor="rgba(150, 150, 150, 0.25)"/>
      <div class="sheet--bd">
        <ul class="list">
          <!-- TODO 遍历 -->
          <li v-for="item in data" :key="item.adjustDetailUkid">
            <OrderSheetGoods :item="item"/>
            <wms-whitespace size="2" bgcolor="rgba(150, 150, 150, 0.25)" style="margin: 12px 0;"/>
          </li>
        </ul>
        <wms-whitespace size="4" bgcolor="rgba(150, 150, 150, 0.25)" style="margin: 15px 0;"/>
        <OrderSheetTotal/>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSheetGoods from './OrderSheetGoods'
import OrderSheetTotal from './OrderSheetTotal'

export default {
  name: 'OrderSheet',
  components: {
    OrderSheetGoods,
    OrderSheetTotal
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-sheet {
  position: relative;
  z-index: 8;
  > .layer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.65);
  }
  > .content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 60px;
    background: #fff;
    box-shadow: inset 0px 1px 3px 0px rgba(126, 126, 126, 0.53);
  }
}
.sheet--hd {
  display: flex;
  justify-content: center;
  padding: 10px;
  > span {
    flex: 1 0;
    text-align: center;
  }
}
.sheet--bd {
  padding: 12px 0;
  > .list {
    padding: 0 10px;
  }
}
</style>
