<template>
  <Addup>
    <template slot="addup">
      <div class="item amount">
        <span>数量：</span>
        <span>{{ count }}</span>
      </div>
      <div class="item price">
        <span>金额：</span>
        <span>{{ price| CNY }}</span>
      </div>
    </template>

    <template slot="sheet">
      <Content :list="list"/>
    </template>
    <template slot="button">
      <span @click="comfirm">保存</span>
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
