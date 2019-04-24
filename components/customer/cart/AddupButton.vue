<template>
  <Addup class="cart-addup">
    <template slot="addup">
      <div class="item amount">
        <span>种类：</span>
        <span>{{ kindNum }}</span>
        <wms-whitespace direction="horizontal" size="20"/>
        <span>数量：</span>
        <span>{{ count }}</span>
      </div>
      <div class="item price">
        <span>金额：</span>
        <span>{{ price | CNY }}</span>
      </div>
    </template>
    <template slot="button">
      <span @click="submit">下单</span>
    </template>
  </Addup>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { sumBy } from 'lodash'
import Addup from '@/components/share/addup'
export default {
  name: 'AddupButton',

  components: {
    Addup
  },
  computed: {
    ...mapGetters({
      list: 'cart/goodsList'
    }),
    kindNum() {
      return this.list.length
    },
    count() {
      return sumBy(this.list, item => item.count)
    },
    price() {
      return sumBy(this.list, item => {
        return item.count * item.perUnitPrice
      })
    }
  },
  methods: {
    ...mapMutations({
      clear: 'cart/clear'
    }),
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
      this.clear()
      this.$router.replace('/customer/order/edit')
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
