<template>
  <div>
    <div infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="reslut">
      <div class="hd">待办采购单</div>
      <template v-for="(item, index) in list">
        <item :key="'item' + index" :data="item"/>
        <wms-whitespace :key="'sep' + index" size="10" bgcolor="rgba(0,0,0,.15)"/>
      </template>
    </div>
    <!-- <div class="load-more">
        <mt-spinner type="fading-circle" :size="16"/>
        <span class="text">正在加载</span>
    </div>-->
    <div>
      <div v-if="isEmpty" @click="lookMore" class="look--more">查看更多</div>
      <div v-else class="load-more">
        <span class="text">暂无待办采购单</span>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'HomeResult',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
      // list: [...new Array(4)]
    }
  },
  computed: {
    isEmpty() {
      return this.list.length !== 0
    }
  },
  methods: {
    loadMore() {
      // TODO 控制请求
      this.loading = true
      setTimeout(() => {
        const last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    lookMore() {
      this.$router.push({
        name: 'owner-purchase-list',
        params: { data: [100, 200] }
      })
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
.hd {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
  font-weight: 900;
}
.look--more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: #999;
}
</style>
