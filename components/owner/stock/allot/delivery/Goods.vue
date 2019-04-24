<template>
  <div class="goods">
    <Box>
      <template slot="hd">
        <div class="goods--title">
          <dl>
            <dt>商品：</dt>
            <dd>种类：{{ typeCount }}</dd>
            <dd>计划数：{{ totalCount }}</dd>
          </dl>
        </div>
      </template>

      <template slot="bd">
        <template v-if="isEmpty">
          <div class="empty">暂无商品信息</div>
        </template>
        <div v-else class="goods--list">
          <template v-for="(item, index) in list">
            <wms-whitespace
              v-if="index !== 0"
              :key="'sep' + item.productItemUkid"
              size="5"
              bgcolor="rgba(0,0,0,.15)"
              style="margin: 15px 0;"
            />
            <GoodsCard :key="'card' +item.productItemUkid" :data="item"/>
          </template>
        </div>
      </template>
    </Box>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sumBy } from 'lodash'

import GoodsCard from './GoodsCard'
import Box from '@/components/owner/stock/common/Box'

export default {
  name: 'Goods',
  components: {
    GoodsCard,
    Box
  },

  props: {
    data: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      list: 'public/goods'
    }),
    isEmpty() {
      return this.list.length === 0
    },
    typeCount() {
      return this.list.length
    },
    totalCount() {
      return sumBy(this.list, item => item.allocationQty || 0)
    }
  },

  watch: {
    list(newList) {
      this.data.stAllocationDetails = newList.map(item => {
        return {
          ...item,
          allocationQty: item.count
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods--title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  > dl {
    flex: 1 auto;
    display: flex;
    > dd {
      margin-left: 8px;
    }
  }
}
</style>
