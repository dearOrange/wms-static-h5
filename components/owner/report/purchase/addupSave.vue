<template>
  <div>
    <div v-if="paramsType === 'purchase'" class="order--box">
      <div class="item">
        <span>采购总数量</span>
        <span class="count">{{ qtyCount || 0 }}</span>
      </div>
      <div class="item">
        <span>采购总金额</span>
        <span class="count">{{ qtyAmount | CNY }}</span>
      </div>
    </div>
    <div v-else class="order--box">
      <div class="item">
        <span>退货总数量</span>
        <span class="count">{{ qtyCount || 0 }}</span>
      </div>
      <div class="item">
        <span>退货总金额</span>
        <span class="count">{{ qtyAmount | CNY }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sumBy } from 'lodash'
export default {
  name: 'AddupSave',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    paramsType: {
      type: String,
      default() {
        return 'purchaseBack'
      }
    }
  },
  computed: {
    qtyCount() {
      return sumBy(this.list, item => item.qty)
    },
    qtyAmount() {
      return sumBy(this.list, item => item.price)
    }
  }
}
</script>

<style lang="scss" scoped>
.order--box {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-around;
  > .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    > .count {
      color: #f00;
    }
  }
}
</style>
