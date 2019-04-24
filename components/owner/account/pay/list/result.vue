<template>
  <div>
    <div class="list sc">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="reslut"
      >
        <template v-for="(item, index) in list">
          <item :key="'item' + index" :data="item"/>
          <wms-whitespace :key="'sep' + index" size="10" bgcolor="rgba(0,0,0,.15)"/>
        </template>
      </div>
      <div v-if="hasMore" class="load-more">
        <mt-spinner type="fading-circle" :size="16"/>
        <span class="text">正在加载</span>
      </div>
      <div v-if="!hasMore && isEmpty" class="load-more">
        <span class="text">暂无数据</span>
      </div>
    </div>
    <div v-if="isShow" class="result_btn" @click="goFilter">
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <div class="btn">批量结算</div>
    </div>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from '@/components/owner/account/pay/list/Item'
import { fetchList } from '@/api/account/pay'

export default {
  name: 'PayResult',
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
      pageSize: 10,
      pageNum: 0,
      hasMore: true,
      filters: []
      // list: [...new Array(10)]
    }
  },
  computed: {
    isShow() {
      return this.filters.length !== 0
    },
    isEmpty() {
      return this.list.length === 0
    }
  },
  watch: {
    list: function(newVal, oldVal) {
      this.filters = newVal.filter(item => {
        return item.payableBillStatus === 10 || item.payableBillStatus === 50
      })
    },
    params: {
      handler() {
        this.list = []
        this.hasMore = true
        this.pageNum = 1
        this.fetch(false)
      }
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
    goFilter() {
      this.$router.push({
        name: 'owner-account-pay-filter',
        params: { data: this.filters }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  height: calc(100vh - 60px - 48px);
  overflow-y: auto;
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
.result_btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  & > .btn {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    background: #26a2ff;
    color: #fff;
  }
}
</style>
