<template>
  <Addup>
    <template slot="addup">
      <div class="order--box">
        <div class="count">
          <span>数量</span>
          <span>({{ count }})</span>
        </div>
        <div class="amount">
          <div>
            <span>金额：</span>
            <span>{{ (price - data.reduceAmount) | CNY }}</span>
          </div>
          <div class="price">
            <span>优惠：</span>
            <span>{{ data.reduceAmount | CNY }}</span>
          </div>
        </div>
      </div>
    </template>

    <template slot="sheet">
      <Content :data="data"/>
    </template>

    <template slot="button">
      <span @click="comfirm">保存</span>
    </template>
  </Addup>
</template>

<script>
import { sumBy } from 'lodash'

import Addup from '@/components/share/addup'
import Content from './sheet/Content'

export default {
  name: 'AddupButton',
  components: {
    Addup,
    Content
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    count() {
      return sumBy(this.data.detailList, item => item.purchaseQty)
    },
    price() {
      return sumBy(this.data.detailList, item => {
        return item.purchaseQty * (item.purchaseUnitCost || 0)
      })
    }
  },
  methods: {
    comfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.order--box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .count {
    color: #333;
  }
  > .amount {
    margin-left: 20px;
    > .price {
      color: #333;
    }
  }
}
</style>
