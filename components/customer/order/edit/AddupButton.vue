<template>
  <Addup class="customer-order-addup">
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
      <span @click="save">保存草稿</span>
      <wms-whitespace direction="horizontal" bgcolor="white" size="2" style="height: 100%;"/>
      <span @click="submit">提交</span>
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
      return sumBy(this.data.ordDetailList, 'orderQty')
    },
    price() {
      return sumBy(this.data.ordDetailList, item => {
        return item.orderQty * item.unitPrice
      })
    }
  },
  methods: {
    save() {
      this.$emit('confirm', true)
    },
    submit() {
      this.$emit('confirm', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-order-addup {
  /deep/ .fixed-inner .button {
    flex-basis: 50%;
  }
}
</style>
