<template>
  <div>
    <wms-header title="购物车">
      <template slot="right">
        <span @click="clear">清除</span>
      </template>
    </wms-header>
    <GoodsList />
    <AddupButton />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import GoodsList from './GoodsList'
import AddupButton from './AddupButton'
export default {
  name: 'Container',
  components: {
    GoodsList,
    AddupButton
  },
  methods: {
    ...mapMutations({
      clear: 'cart/clear'
    })
  }
}
</script>
