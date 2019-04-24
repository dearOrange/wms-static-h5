<template>
  <div class="goods-card">
    <div class="card-hd">
      <div class="goods--total">
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
        <!-- <img class="preview" src="https://via.placeholder.com/64"> -->
        <span class="total">库存{{ data.inventoryQtySum }}</span>
      </div>
      <div class="goods--content">
        <div class="name">{{ data.productName }}</div>
        <div class="unit">
          <span>{{ data.productItemName }}</span>
        </div>
        <div class="price-count">
          <span class="price">{{ data.unitPrice | CNY }}/{{ data.measureUnitName }}</span>
          <wms-num-count v-model="count"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'

export default {
  name: 'GoodsCard',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapGetters({
      storedList: `public/goods`
    }),

    storedCount() {
      let foundItem = find(
        this.storedList,
        item => item.productItemUkid === this.data.productItemUkid
      )
      if (foundItem) {
        return foundItem.count
      } else {
        return 0
      }
    }
  },
  watch: {
    count(newCount, oldCount) {
      this.$emit('countChange', newCount)
    },
    storedCount: {
      handler(newCount) {
        // console.log(this.data)
        this.count = this.data._selected ? this.data.count : newCount
      },
      immediate: true
    }
  }
  // ,
  // beforeMount() {
  //   console.log('---0')
  // },
  // mounted() {
  //   console.log('---1')
  //   this.count = this.data.count
  // }
}
</script>

<style lang="scss" scoped>
.goods-card {
  > .card-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    > .goods--total {
      margin-right: 10px;
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
    .goods--content {
      height: 100%;
    }
  }
  > .card-bd {
    margin-top: 10px;
  }
}
.goods--total {
  flex: 1 0 auto;
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
    height: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 12px;
  }
}
.goods--content {
  flex: 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .price-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .price {
      color: red;
      font-weight: 700;
    }
  }
}
.goods--count {
  flex: 1 0 auto;
}
</style>
