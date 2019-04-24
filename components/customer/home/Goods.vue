<template>
  <div class="goods">
    <Box>
      <template slot="bd">
        <template v-if="isEmpty">
          <div class="empty">暂无商品信息</div>
        </template>
        <div v-else class="goods--list">
          <!-- TODO 根据数据项属性ID来设置ID -->
          <template v-for="(item) in list">
            <template>
              <wms-whitespace
                :key="'sep-' + item.productItemUkid"
                size="1"
                bgcolor="rgba(0,0,0,.15)"
                style="margin: 15px 0;"
              />
            </template>
            <GoodsCard :key="'card-' + item.productItemUkid" :data="item"/>
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
import Box from '@/components/customer/home/Box'

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
      return sumBy(this.list, item => item.count)
    }
  },

  watch: {
    list(newList = []) {
      this.data.stAdjustDetails = newList.map(item => {
        return {
          ...item,
          adjustQty: item.count
        }
      })
    }
  },

  methods: {}
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

.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
