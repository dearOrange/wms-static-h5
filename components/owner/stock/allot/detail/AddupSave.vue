<template>
  <Addup :dataStatus="data.allocationStatus">
    <template slot="addup">
      <div v-if="data.allocationStatus === 300 || data.allocationStatus === 600" class="allot">
        <div class="item amount">
          <span>计划数：</span>
          <span>{{ count || 0 }}</span>
        </div>
        <div class="item price">
          <span>调出数：</span>
          <span>{{ data.shippedQty || 0 }}</span>
        </div>
        <div class="item price">
          <span>调入数：</span>
          <span>{{ data.receiveQty || 0 }}</span>
        </div>
      </div>
      <div v-else class="else--desc">
        <div class="item amount">
          <span>数量：</span>
          <span>{{ count || 0 }}</span>
        </div>
        <div class="item price">
          <span>金额：</span>
          <span>{{ price | CNY }}</span>
        </div>
      </div>
    </template>
    <template slot="sheet">
      <Content :dataStatus="data.allocationStatus" :list="list"/>
    </template>

    <template
      v-if="data.allocationStatus === 100 || data.allocationStatus === 300 || data.allocationStatus === 600"
      slot="button"
    >
      <span @click="comfirm">确认</span>
    </template>
  </Addup>
</template>

<script>
import { mapGetters } from 'vuex'
import { sumBy } from 'lodash'

import Addup from '@/components/owner/stock/common/addup'
import Content from './sheet/Content'

export default {
  name: 'AddupSave',
  components: {
    Addup,
    Content
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      sheetShown: false
    }
  },
  computed: {
    ...mapGetters({
      list: 'public/goods'
    }),
    count() {
      return sumBy(this.list, item => item.count)
    },
    shipped() {
      return sumBy(this.list, item => item.shippedQty)
    },
    price() {
      return sumBy(this.list, item => {
        return item.count * item.unitPrice
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
.allot {
  display: flex;
  justify-content: space-around;
}
.else--desc {
  align-self: flex-start;
  padding-left: 15px;
}
</style>
