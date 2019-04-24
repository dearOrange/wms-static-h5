<template>
  <div>
    <div class="product--content">
      <div class="product--img">
        <!-- <svg v-if="!data.productItemImage" class="icon" aria-hidden="true">
          <use xlink:href="#icon-zanwutupian1-copy-copy-copy-copy"></use>
        </svg>-->
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
      </div>
      <div class="product--name">
        <p>{{ data.productName }}</p>
        <p>{{ data.productItemName }}</p>
      </div>
    </div>
    <div class="list_box">
      <div class="list_item item--first">
        <span>日期</span>
        <span>{{ data.createTime | date }}</span>
      </div>
      <div class="list_item item--box">
        <span>业务类型</span>
        <span>{{ data.relatedTypeName }}</span>
      </div>
      <div class="list_item item--box">
        <span>单位</span>
        <span>{{ data.measureUnitName }}</span>
      </div>
      <div class="list_item item--box">
        <span>数量</span>
        <span>{{ data.transactionQty || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WareItem',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.product--content {
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  & > .product--img {
    // width: 80px;
    // height: 60px;
    // border: 1px solid #ccc;
    > .icon {
      width: 64px;
      height: 64px;
      color: #ccc;
    }
    > .preview {
      width: 64px;
      height: 64px;
    }
  }
  & > .product--name {
    flex: 1;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.list_box {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  > .list_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    > span {
      padding: 10px 0;
    }
  }
  > .item--first {
    margin-right: 10px;
  }
  > .item--box {
    flex: 1;
  }
}
</style>
