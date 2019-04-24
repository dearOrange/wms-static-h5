<template>
  <div>
    <div class="product--content">
      <div class="product--img">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zanwutupian1-copy-copy-copy-copy"></use>
        </svg>-->
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
      </div>
      <div class="product--name">
        <p>{{ data.productName }}</p>
        <p>{{ data.productItemName }}</p>
      </div>
      <div class="remove-btn">
        <p>单位：{{ data.measureUnitName }}</p>
      </div>
    </div>
    <div class="order--price">
      <div>
        <span>单价</span>
        <span>{{ data.perUnitCost | CNY }}</span>
      </div>
      <div>
        <span>库存金额</span>
        <span>{{ data.inventoryTotal | CNY }}</span>
      </div>
      <div>
        <span>库存数量</span>
        <span>{{ data.qty }}</span>
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
  & > .remove-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.order--price {
  display: flex;
  padding: 10px 0;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
