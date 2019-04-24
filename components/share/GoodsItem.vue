<template>
  <div class="goods-item">
    <div class="hd">
      <div class="goods-preview">
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
        <!-- <img src="https://via.placeholder.com/64"> -->
        <span class="inventory">库存:{{ data.inventoryQtySum || 0 }}</span>
      </div>
      <div class="goods-info">
        <div class="name">{{ data.productName }}</div>
        <div class="desc">
          <span>{{ data.productItemName }}</span>
        </div>
        <div class="unit">
          <span>单位：{{ data.measureUnitName }}</span>
        </div>
      </div>

      <div v-if="deletable" class="goods-delete" @click="deleteGoods">删除</div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="bd">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteGoods() {
      this.$store.commit('public/delOneGoods', {
        productItemUkid: this.data.productItemUkid
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-item {
  > .hd {
    display: flex;
    margin-bottom: 10px;
  }
  > .bd {
    margin-top: 10px;
  }
}
.goods-preview {
  position: relative;
  margin-right: 15px;
  width: 64px;
  height: 64px;
  > img {
    display: block;
  }
  > .icon {
    width: 64px;
    height: 64px;
    color: #ccc;
  }
  > .preview {
    width: 64px;
    height: 64px;
  }
  > .inventory {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
  }
}
.goods-info {
  flex: 1;
}
.goods-delete {
  align-self: center;
}
</style>
