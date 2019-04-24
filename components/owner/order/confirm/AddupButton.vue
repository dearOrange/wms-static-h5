<template>
  <Addup>
    <template slot="addup">
      <div class="item amount">
        <span>计划总数：</span>
        <span>{{ totalCount }}</span>
      </div>
      <div class="item price">
        <span>本次发货：</span>
        <span>{{ currentShippedCount }}</span>
      </div>
      <div class="item price">
        <span>剩余未发：</span>
        <span>{{ totalCount - shippedCount - currentShippedCount }}</span>
      </div>
    </template>

    <template slot="sheet">
      <Content :list="list"/>
    </template>
    <template slot="button">
      <span @click="confirm">确认发货</span>
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
      return sumBy(this.list, 'orderQty')
    },
    shippedCount() {
      return sumBy(this.list, 'shippedQty')
    },
    currentShippedCount() {
      return sumBy(this.list, 'count')
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
