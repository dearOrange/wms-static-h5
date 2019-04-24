<template>
  <Addup>
    <template slot="addup">
      <div class="item amount">
        <span>计划总数：</span>
        <span>{{ totalCount }}</span>
      </div>
      <div class="item price">
        <span>本次收货：</span>
        <span>{{ currentReceivedCount }}</span>
      </div>
      <div class="item price">
        <span>剩余未收：</span>
        <span>{{ totalCount - receivedCount - currentReceivedCount }}</span>
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
import { MessageBox } from 'mint-ui'
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
      return sumBy(this.list, 'purchaseQty')
    },
    receivedCount() {
      return sumBy(this.list, 'receivedQty')
    },
    currentReceivedCount() {
      return sumBy(this.list, 'count')
    }
  },
  methods: {
    confirm() {
      if (this.currentReceivedCount === 0) {
        MessageBox({
          title: '提示',
          message: '本次总收货次数不能为0',
          showCancelButton: true
        })
      } else {
        this.$emit('confirm')
      }
    }
  }
}
</script>
