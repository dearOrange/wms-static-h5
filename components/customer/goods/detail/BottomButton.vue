<template>
  <Addup class="cart-addup">
    <template slot="addup">
      <ShoppingCart />
    </template>
    <template slot="button">
      <span @click="submit">加入购物车</span>
    </template>
  </Addup>
</template>

<script>
import { mapGetters } from 'vuex'
import { sumBy } from 'lodash'
import Addup from '@/components/share/addup'
import ShoppingCart from './ShoppingCart'
export default {
  name: 'BottomButton',

  components: {
    Addup,
    ShoppingCart
  },
  computed: {
    ...mapGetters({
      list: 'cart/goodsList'
    }),
    count() {
      return sumBy(this.list, item => item.count)
    }
  },
  methods: {
    submit() {
      this.$emit('addCart')
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-addup {
  /deep/ .fixed-inner .button {
    flex-basis: 30%;
  }
}
</style>
