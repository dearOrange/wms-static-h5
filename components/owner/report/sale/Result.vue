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
    </div>
    <div v-if="hasMore" class="load-more">
      <mt-spinner type="fading-circle" :size="16"/>
      <span class="text">正在加载</span>
    </div>
    <div v-if="!hasMore && isEmpty" class="load-more">
      <span class="text">暂无数据</span>
    </div>
    <SaleBottom :data="listStr"/>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from './Item'
import SaleBottom from '@/components/owner/report/sale/Bottom'
import { sellList } from '@/api/owner/report'

export default {
  name: 'Result',
  components: {
    Item,
    SaleBottom
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
      pageSize: 10,
      pageNum: 0,
      hasMore: true,
      loading: false,
      list: [],
      listStr: {}
    }
  },
  watch: {
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
      let { success, data } = await sellList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.params
      })
      if (success) {
        if (data.modelList && data.modelList.length < this.pageSize) {
          this.hasMore = false
        }
        this.listStr = { ...data }
        if (append) {
          this.list = concat(this.list, data.modelList)
        } else {
          this.list = data.modelList
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
