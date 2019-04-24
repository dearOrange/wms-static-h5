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
      </template>
    </div>
    <div v-if="!hasMore && isEmpty" class="load-more">
      <span class="text">暂无数据</span>
    </div>
    <div v-if="hasMore" class="load-more">
      <mt-spinner type="fading-circle" :size="16"/>
      <span class="text">正在加载</span>
    </div>
    <div class="total_account">
      <div>
        <span>收款总金额</span>
        <span class="account">{{ listStr.paidAmountSum | CNY }}</span>
      </div>
      <div>
        <span>付款总金额</span>
        <span class="account">{{ listStr.receivedAmountSum | CNY }}</span>
      </div>
      <div>
        <span>合计总金额</span>
        <span class="account">{{ listStr.leftAmountSum | CNY }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from '@/components/owner/account/bill/Item'
import { fetchList } from '@/api/account/bill'

export default {
  name: 'AccountResult',
  components: {
    Item
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
      loading: false,
      list: [],
      listStr: {},
      pageSize: 10,
      pageNum: 0,
      hasMore: true
      // list: [...new Array(10)]
    }
  },
  computed: {
    isEmpty() {
      return this.list.length === 0
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
  methods: {
    async fetch(append = true) {
      let { success, data } = await fetchList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.params
      })
      if (success) {
        this.listStr = data
        if (data.modelList && data.modelList.length < this.pageSize) {
          this.hasMore = false
        }
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
.total_account {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px 20px;
  // border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .account {
      padding: 6px 0 0;
      color: #f00;
    }
  }
}
</style>
