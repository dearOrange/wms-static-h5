<template>
  <div class="container">
    <AsyncLoader ref="loader" :loader="fetch">
      <template slot-scope="data">
        <Picture :data="data"/>
        <Info :data="data" @countChange="onCountChange"/>
        <GoodsDesc :data="data"/>
        <BottomButton :data="data" @addCart="onAddCart(data)"/>
      </template>
    </AsyncLoader>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import AsyncLoader from '@/components/share/async-loader'
import { getDetail } from '@/api/customer/goods'
import Picture from './Picture'
import Info from './Info'
import GoodsDesc from './Desc'
import BottomButton from './BottomButton'
export default {
  name: 'Container',
  components: {
    AsyncLoader,
    Picture,
    Info,
    GoodsDesc,
    BottomButton
  },

  data() {
    return {
      count: 0
    }
  },

  methods: {
    ...mapMutations({
      updateCart: 'cart/update'
    }),
    fetch() {
      let { id } = this.$route.params
      return getDetail(id)
    },

    onAddCart(data) {
      this.updateCart({
        id: data.productItemUkid,
        data: data,
        count: this.count
      })
      this.$router.go(-1)
    },
    onCountChange(count) {
      this.count = count
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
