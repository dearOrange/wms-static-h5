<template>
  <Addup>
    <template slot="addup">
      <div class="order--box">
        <div class="count">
          <span>数量</span>
          <span>({{ orderCount }})</span>
        </div>
        <div class="amount">
          <div>
            <span>金额：</span>
            <span>{{ amountCount | CNY }}</span>
          </div>
          <div class="price">
            <span>优惠：</span>
            <span>{{ discount | CNY }}</span>
          </div>
        </div>
      </div>
    </template>

    <template slot="sheet">
      <Content :list="list" :discount="discount" :is-confirm="isConfirm"/>
    </template>

    <template slot="button">
      <span @click="confirm">确认</span>
    </template>
  </Addup>
</template>

<script>
import { sumBy } from '@/utils'

import Addup from '@/components/share/addup'
import Content from './sheet/Content'

export default {
  name: 'AddupButton',
  components: {
    Addup,
    Content
  },
  props: {
    isConfirm: {
      type: Boolean
    },
    discount: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      sheetShown: false
    }
  },
  computed: {
    orderCount() {
      return sumBy(this.list, 'purchaseQty')
    },
    amountCount() {
      return (
        sumBy(this.list, this.isConfirm ? 'receivedAmount' : 'purchaseAmount') -
        this.discount
      )
    }
  },
  methods: {
    confirm() {
      this.$router.go(-1)
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
