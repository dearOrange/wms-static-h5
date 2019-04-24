<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="reslut"
    >
      <template v-for="(item, index) in list">
        <Item :key="'item_' + item.orderUkid" :data="item" @changeStatus="onItemStatusChange(index, $event)"/>
        <wms-whitespace :key="'sep_' + item.orderUkid" size="10" bgcolor="rgba(0,0,0,.15)" />
      </template>
    </div>
    <div v-if="hasMore" class="load-more">
      <mt-spinner type="fading-circle" :size="16" />
      <span class="text">正在加载</span>
    </div>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from './Item'
import { getListFromCustomer as getList } from '@/api/owner/order'
import { replaceBy } from '@/utils'

export default {
  name: 'Result',
  components: {
    Item
  },
  props: {
    query: {
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
      list: []
    }
  },

  watch: {
    query: {
      handler() {
        this.list = []
        this.hasMore = true
        this.pageNum = 1
        this.fetch(false)
      }
    }
  },
  methods: {
    /**
     * 列表数据抓取
     * @param {Boolean} [append=true] 列表数据追加
     * @param {Boolean} [append=false] 列表数据替换
     */
    async fetch(append = true) {
      let { success, data } = await getList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.query
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
    },

    onItemStatusChange(cancelIndex, status) {
      let oItem = this.list[cancelIndex]
      let nItem = Object.assign(oItem, {
        orderStatus: status
      })
      this.list = replaceBy(this.list, nItem, 'orderUkid')
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
