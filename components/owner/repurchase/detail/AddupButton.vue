<template>
  <Addup>
    <template slot="addup">
      <div class="item amount">
        <span>数量：</span>
        <span>{{ orderCount }}</span>
      </div>
      <div class="item price">
        <span>金额：</span>
        <span>{{ amountCount }}</span>
      </div>
    </template>

    <template slot="sheet">
      <Content :list="list" :discount="discount" :is-confirm="isConfirm"/>
    </template>

    <template slot="button">
      <span>确认</span>
    </template>
  </Addup>
</template>

<script>
import { sumBy } from '@/utils'

import Addup from '@/components/share/addup'
import Content from './sheet/Content'

export default {
  name: 'AddupSave',
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
      return sumBy(this.list, 'backQty')
    },
    amountCount() {
      return sumBy(this.list, 'refundAmount')
    }
  }
}
</script>
