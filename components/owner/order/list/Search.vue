<template>
  <div class="search-and-button">
    <search-box v-model="query.productName" placeholder="输入客户/仓库"/>
    <nuxt-link to="/owner/order/edit" tag="div" class="add-button">
      <mt-button plain size="small" type="primary">新增</mt-button>
    </nuxt-link>
  </div>
</template>

<script>
import Search from '@/components/share/Search'

export default {
  name: 'Search',
  components: {
    SearchBox: Search
  },
  props: {
    query: {
      type: Object
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search-and-button {
  display: flex;
  padding: 0 10px;
  .add-button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 0 10px;
    // border: 1px solid #ccc;
    margin-left: 15px;
  }
}
</style>
