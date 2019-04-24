<template>
  <div class="goods">
    <Box>
      <template slot="hd">
        <div class="goods--title">
          <dl>
            <dt>商品：</dt>
            <dd>种类：{{ typeCount }}</dd>
            <dd>总数：{{ totalCount }}</dd>
          </dl>
          <div class="operation">
            <template v-if="!isEmpty">
              <span @click="goChooseGoods">修改</span>
              <span @click="clear">清空</span>
            </template>
          </div>
        </div>
      </template>
      <template slot="bd">
        <template v-if="isEmpty">
          <div class="empty">
            暂无商品信息, 请立刻
            <a @click="goChooseGoods">添加</a>
          </div>
        </template>
        <div v-else class="goods--list">
          <!-- TODO 根据数据项属性ID来设置ID -->
          <template v-for="(item, index) in list">
            <template v-if="index !== 0">
              <wms-whitespace
                :key="'sep-' + item.productItemUkid"
                size="5"
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
import { mapGetters, mapMutations } from 'vuex'
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
      return sumBy(this.list, item => item.count)
    }
  },

  watch: {
    list(newList = []) {
      this.data.detailExpandList = newList.map(
        ({ productItemUkid, count, measureUnit }) => {
          return {
            productItemUkid,
            measureUnit,
            adjustQty: count
          }
        }
      )
    }
  },

  methods: {
    ...mapMutations({
      clear: 'public/delGoods'
    }),
    goChooseGoods() {
      this.$router.push('/public/goods?purchase=1')
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

.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
