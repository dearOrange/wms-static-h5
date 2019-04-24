<template>
  <div>
    <Search :filter="filter"/>
    <HomeFilter :filter="filter"/>
    <AsyncLoader ref="loader" :loader="fetch" @success="list = $event">
      <template slot-scope="">
        <GoodsList :list="list"/>
      </template>
    </AsyncLoader>
    <ShoppingCart />
  </div>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import ShoppingCart from './ShoppingCart'
import Search from './Search'
import HomeFilter from './Filter'
import GoodsList from './GoodsList'

import { getGoodsList } from '@/api/customer/home'
export default {
  name: 'Container',
  components: {
    AsyncLoader,
    Search,
    HomeFilter,
    GoodsList,
    ShoppingCart
  },
  data() {
    return {
      filter: {
        productName: '',
        categoryUkid: '',
        priceSwitch: '',
        nameSwitch: ''
      },
      list: []
    }
  },
  watch: {
    filter: {
      handler(newFilter) {
        this.filter = newFilter
        this.$refs.loader.fetch()
      },
      deep: true
    }
  },
  methods: {
    fetch(params = this.filter) {
      return getGoodsList(params)
    }
  }
}
</script>
