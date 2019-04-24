<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="reslut"
    >
      <template v-for="(item, index) in list">
        <item :key="'item' + index" :data="item" :paramsType="params.purchaseType"/>
        <wms-whitespace :key="'sep' + index" size="2" bgcolor="rgba(0,0,0,.15)"/>
      </template>
    </div>
    <div v-if="hasMore" class="load-more">
      <mt-spinner type="fading-circle" :size="16"/>
      <span class="text">正在加载</span>
    </div>
    <div v-if="!hasMore && isEmpty" class="load-more">
      <span class="text">暂无数据</span>
    </div>
    <AddupSave :list="list" :paramsType="params.purchaseType"/>
  </div>
</template>

<script>
import { concat } from 'lodash'
import Item from '@/components/owner/report/purchase/Item'
import AddupSave from '@/components/owner/report/purchase/addupSave'
import { getList } from '@/api/owner/report'

export default {
  name: 'ReceiveResult',
  components: {
    Item,
    AddupSave
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
      list: []
      // list: [...new Array(10)]
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
      let { success, data } = await getList({
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
  border-top: 1px solid #999;
  justify-content: flex-end;
  & > .btn {
    padding: 20px;
  }
}
</style>
