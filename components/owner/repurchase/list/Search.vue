<template>
  <div class="search-and-button">
    <SearchBox v-model="query.keywords" placeholder="输入供应商/仓库"/>
    <nuxt-link to="/owner/repurchase/edit" tag="div" class="add-button">
      <mt-button type="primary" size="small" plain>新增</mt-button>
    </nuxt-link>
  </div>
</template>

<script>
import Search from '@/components/share/Search'

export default {
  name: 'RepurchaseSearch',
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
    margin-left: 15px;
  }
}
</style>
