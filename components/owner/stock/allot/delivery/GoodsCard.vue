<template>
  <div class="goods-card">
    <div class="card-hd">
      <div class="goods--total">
        <WmsGoodsPreview v-if="!data.productItemImage"/>
        <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
        <!-- <img class="preview" src="https://via.placeholder.com/64"> -->
        <span class="total">库存:{{ data.inventoryQty || 0 }}</span>
      </div>
      <div class="goods--content">
        <div class="name">{{ data.productName }}</div>
        <div class="info">
          <span>{{ data.productItemName }}</span>
        </div>
      </div>
      <div>单位：{{ data.measureUnitName }}</div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="card-bd">
      <div class="goods--amount">
        <div class="amount--item">
          <span class="name">计划数</span>
          <span class="value">{{ data.allocationQty || 0 }}</span>
        </div>
        <div class="amount--item">
          <span class="name">差异数</span>
          <span class="value">{{ planNum }}</span>
        </div>
        <div class="amount--item">
          <span class="name">实际发货</span>
          <span>
            <wms-num-count v-model="count" :max="data.allocationQty"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
    dataStatus: {
      type: Number
    }
  },
  data() {
    return {
      count: this.data.allocationQty,
      planNum: 0
    }
  },
  watch: {
    'data.allocationQty': {
      handler(newCount) {
        this.count = newCount
      }
    },
    count: {
      handler(newCount) {
        this.updateCount({
          productItemUkid: this.data.productItemUkid,
          count: newCount
        })
        this.planNum = this.data.allocationQty - newCount
      }
    }
  },

  methods: {
    ...mapMutations({
      updateCount: 'public/updateGoodsCount'
    })
  }
}
</script>

<style lang="scss" scoped>
.goods-card {
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
