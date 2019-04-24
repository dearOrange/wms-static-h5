<template>
  <Box>
    <div slot="bd">
      <template v-if="isEmpty">
        <div class="empty">暂无商品信息</div>
      </template>
      <template v-else>
        <template v-for="(item) in list">
          <GoodsItem :key="`item_${item.productItemUkid}`" :data="item" />
          <wms-whitespace
            :key="'sep_' + item.productItemUkid"
            size="5"
            bgcolor="rgba(0,0,0,.15)"
            style="margin: 15px 0;"
          />
        </template>
      </template>
    </div>
  </Box>
</template>

<script>
import Box from './Box'
import GoodsItem from './GoodsItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsItem,
    Box
  },

  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    isEmpty() {
      return this.list.length === 0
    }
  },

  // watch: {
  //   list(newList = []) {
  //     this.data.ordDetailList = newList.map(
  //       ({
  //         productItemUkid,
  //         productItemCode,
  //         count,
  //         measureUnit,
  //         unitPrice
  //       }) => {
  //         return {
  //           productItemUkid,
  //           productItemCode,
  //           measureUnit,
  //           orderQty: count,
  //           unitPrice
  //         }
  //       }
  //     )
  //   }
  // },

  methods: {
    goChooseGoods() {
      this.$router.push('/public/goods')
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
