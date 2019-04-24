<template>
  <div class="goods-item" @click="goDetail">
    <div class="hd">
      <div class="goods-preview">
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
        <span class="inventory">库存:{{ data.inventoryQtySum || 0 }}</span>
      </div>
      <div class="goods-info">
        <div class="name">{{ data.productName }}</div>
        <div class="desc">
          <span>{{ data.productItemName }}</span>
        </div>
        <div class="unit">
          <span class="price">{{ data.perUnitPrice | CNY }}/{{ data.measureUnitName }}</span>
          <wms-num-count v-model="count"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { find } from 'lodash'

export default {
  name: 'GoodsItem',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapGetters({
      storedCarts: 'cart/list'
    })
  },
  watch: {
    count(newCount) {
      this.updateCart({
        id: this.data.productItemUkid,
        data: this.data,
        count: newCount
      })
    }
  },
  mounted() {
    let foundItem = find(
      this.storedCarts,
      item => item.id === this.data.productItemUkid
    )
    if (foundItem) {
      this.count = foundItem.count
    }
  },
  methods: {
    ...mapMutations({
      updateCart: 'cart/update'
    }),

    goDetail() {
      this.$router.push({
        name: 'customer-goods-id',
        params: {
          id: this.data.productItemUkid
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-item {
  > .hd {
    display: flex;
  }
  > .bd {
    margin-top: 10px;
  }
}
.goods-preview {
  position: relative;
  margin-right: 15px;
  > img {
    display: block;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .unit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .price {
      color: red;
      font-weight: 700;
    }
  }
}
</style>
