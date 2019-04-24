<template>
  <div class="goods-card">
    <div class="card-hd">
      <div class="goods--total">
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
        <!-- <img class="preview" src="https://via.placeholder.com/64"> -->
      </div>
      <div class="goods--content">
        <div class="name">{{ data.productName }}</div>
        <div class="info">
          <span>{{ data.productItemName }}</span>
        </div>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="card-bd">
      <div class="goods--amount">
        <div class="amount--item">
          <span class="name">单位</span>
          <span>{{ data.measureUnitName }}</span>
        </div>
        <div v-if="paramsType === 'purchase'" class="amount--item">
          <span class="name">采购数量</span>
          <span class="value">{{ data.qty || 0 }}</span>
        </div>
        <div v-if="paramsType === 'purchaseBack'" class="amount--item">
          <span class="name">退货数量</span>
          <span class="value">{{ data.qty || 0 }}</span>
        </div>
        <div v-if="paramsType === 'purchase'" class="amount--item">
          <span class="name">采购金额</span>
          <span class="value">{{ data.price | CNY }}</span>
        </div>
        <div v-if="paramsType === 'purchaseBack'" class="amount--item">
          <span class="name">退货金额</span>
          <span class="value">{{ data.price | CNY }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsCard',

  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    paramsType: {
      type: String,
      default() {
        return 'purchaseBack'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-card {
  padding: 10px;
  > .card-hd {
    display: flex;
    margin-bottom: 10px;
    > .goods--total {
      margin-right: 15px;
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
  }
  > .card-bd {
    margin-top: 10px;
  }
}

.goods--total {
  position: relative;
  > .preview {
    display: block;
  }

  > .total {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 28px;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}

.goods--amount {
  display: flex;
  > .amount--item {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      margin-bottom: 5px;
    }
    .value {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
