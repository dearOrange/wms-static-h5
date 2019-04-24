<template>
  <Addup>
    <template slot="addup">
      <div class="item amount">
        <span>退货数量：</span>
        <span>{{ totalCount }}</span>
      </div>
      <div class="item price">
        <span>退货金额：</span>
        <span>{{ amountCount }}</span>
      </div>
    </template>

    <template slot="sheet">
      <Content :list="list"/>
    </template>
    <template slot="button">
      <span @click="confirm">确认收货</span>
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
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    totalCount() {
      return sumBy(this.list, 'returnQty')
    },
    amountCount() {
      return sumBy(this.list, 'refundAmount')
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
