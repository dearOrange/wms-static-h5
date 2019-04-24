<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="reslut"
    >
      <template v-for="(item, index) in list">
        <Item :key="'item' + item.backUkid" :data="item" @cancel="onItemCancel(index)"/>
        <wms-whitespace :key="'sep' + item.backUkid" size="10" bgcolor="rgba(0,0,0,.15)"/>
      </template>
    </div>
    <div v-if="isMore" class="load-more">
      <mt-spinner type="fading-circle" :size="16"/>
      <span class="text">正在加载</span>
    </div>
    <div v-if="!isMore && isEmpty" class="load-more">
      <span class="text">暂无数据</span>
    </div>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from './Item'
import { getList } from '@/api/owner/repurchase'
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
      pageNum: 1,
      isMore: true,
      loading: false,
      list: []
    }
  },
  computed: {
    isEmpty() {
      return this.list.length === 0
    }
  },
  watch: {
    query: {
      handler() {
        this.list = []
        this.isMore = true
        this.pageNum = 1
        this.fetch(false)
      },
      // immediate: true,
      deep: true
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
          this.isMore = false
        }
        if (append) {
          this.list = concat(this.list, data)
        } else {
          this.list = data
        }
      } else {
        this.isMore = false
      }
    },
    async loadMore() {
      if (!this.isMore) {
        return
      }
      this.loading = true
      this.pageNum = this.pageNum + 1
      await this.fetch()
      this.loading = false
    },
    onItemCancel(cancelIndex) {
      let oItem = this.list[cancelIndex]
      let nItem = Object.assign(oItem, {
        backStatus: 990
      })
      this.list = replaceBy(this.list, nItem, 'backUkid')
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
