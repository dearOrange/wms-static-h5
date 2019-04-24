<template>
  <div class="ware-search">
    <div class="inner">
      <SearchBox v-model="params.productName" placeholder="输入商品名称"/>
    </div>
  </div>
</template>

<script>
import Search from '@/components/share/Search'

export default {
  name: 'Search',
  props: {
    params: {
      type: Object
    }
  },
  components: {
    SearchBox: Search
  },

  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$seachHeight: 64px;
.ware-search {
  position: relative;
  z-index: 99;
  height: $seachHeight;
  .inner {
    position: fixed;
    left: 0;
    // top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: $seachHeight;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
}
</style>
