<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="reslut"
    >
      <template v-for="(item, index) in list">
        <item :key="'item' + index" :data="item"/>
        <wms-whitespace :key="'sep' + index" size="1" bgcolor="rgba(0,0,0,.15)"/>
      </template>

      <wms-whitespace size="80"/>
    </div>
    <div v-if="hasMore" class="load-more">
      <mt-spinner type="fading-circle" :size="16"/>
      <span class="text">正在加载</span>
    </div>
    <div v-if="!hasMore && isEmpty" class="load-more">
      <span class="text">暂无数据</span>
    </div>
    <ware-bottom :data-num="totalNum" :data-price="totalPrice"/>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from './item'
import Bottom from '@/components/owner/stock/common/Bottom'
import { getWareList } from '@/api/owner/stock'

export default {
  name: 'WareResult',
  components: {
    Item,
    WareBottom: Bottom
  },
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      totalPrice: 0,
      totalNum: 0,
      pageSize: 10,
      pageNum: 0,
      hasMore: true,
      loading: false
      // list: [...new Array(10)]
    }
  },
  watch: {
    list: function(newVal, oldVal) {
      let arr = this.list
      this.kind = arr.length
      let s = 0
      let p = 0
      arr.forEach(function(val, idx, arr) {
        s += val.inventoryTotal
        p += val.qty
      }, 0)
      this.totalNum = p
      this.totalPrice = s
    },
    params: {
      handler() {
        this.list = []
        this.hasMore = true
        this.pageNum = 1
        this.fetch(false)
      },
      deep: true
    }
  },
  computed: {
    isEmpty() {
      return this.list.length === 0
    }
  },
  methods: {
    async fetch(append = true) {
      let { success, data } = await getWareList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.params
      })
      if (success) {
        if (data && data.length < this.pageSize) {
          this.hasMore = false
        }
        if (append) {
          this.list = concat(this.list, data)
        } else {
          this.list = data
        }
      } else {
        this.hasMore = false
      }
    },
    async loadMore() {
      if (!this.hasMore) {
        return
      }
      this.loading = true
      this.pageNum = this.pageNum + 1
      await this.fetch()
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.reslut {
  width: 100%;
  // position: absolute;
  // top: 146px;
}
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: #999;
  > .text {
    margin-left: 5px;
  }
}
</style>
