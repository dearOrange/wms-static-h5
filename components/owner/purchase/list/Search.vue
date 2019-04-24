<template>
  <div class="search-and-button">
    <SearchBox v-model="query.keywords" placeholder="输入供应商/仓库"/>
    <nuxt-link to="/owner/purchase/edit" tag="div" class="add-button">
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
    // padding: 0 15px;
    // border: 1px solid #ccc;
    margin-left: 15px;
  }
}
</style>
