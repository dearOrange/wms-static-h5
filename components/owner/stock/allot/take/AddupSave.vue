<template>
  <Addup>
    <template slot="addup">
      <div class="item price">
        <span>计划总数：</span>
        <span>{{ price }}</span>
      </div>
      <div class="item amount">
        <span>本次收货：</span>
        <span>{{ count }}</span>
        <span>本次未收：</span>
        <span>{{ residue }}</span>
      </div>
    </template>

    <template slot="sheet">
      <Content :list="list"/>
    </template>

    <template slot="button">
      <span @click="comfirm">确认收货</span>
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
    price() {
      return sumBy(this.list, item => {
        return item.shippedQty || 0
      })
    },
    residue() {
      return this.price - this.count
    }
  },
  methods: {
    comfirm() {
      this.$emit('confirm')
    }
  }
}
</script>
