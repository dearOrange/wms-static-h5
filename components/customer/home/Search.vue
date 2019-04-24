<template>
  <div class="cust-home-search">
    <div class="inner">
      <SearchBox v-model="filter.productName" placeholder="输入商品名称"/>
      <div class="button" @click="submit">
        <mt-button plain size="small" type="primary">下单</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/share/Search'

export default {
  name: 'Search',
  components: {
    SearchBox: Search
  },
  props: {
    filter: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'cart/goodsList'
    })
  },
  methods: {
    submit() {
      this.$store.commit(
        'public/setGoods',
        this.list.map(item => {
          return {
            ...item,
            unitPrice: item.perUnitPrice
          }
        })
      )
      this.$store.commit('cart/clear')
      this.$router.push('/customer/order/edit')
    }
  }
}
</script>

<style lang="scss" scoped>
$seachHeight: 64px;
.cust-home-search {
  position: relative;
  z-index: 99;
  height: $seachHeight;
  .inner {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: $seachHeight;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  .button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $seachHeight - 20px;
    margin-left: 15px;
  }
}
</style>
