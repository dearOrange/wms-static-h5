<template>
  <Addup>
    <template slot="addup">
      <div class="item amount">
        <span>数量：</span>
        <span>{{ count }}</span>
      </div>
      <div class="item price">
        <span>金额：</span>
        <span>{{ price | CNY }}</span>
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
      return sumBy(this.data.returnDetailList, 'returnQty')
    },
    price() {
      return sumBy(this.data.returnDetailList, item => {
        return item.returnQty * item.unitPrice * this.data.discount
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
