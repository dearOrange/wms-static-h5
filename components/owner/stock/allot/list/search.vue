<template>
  <div class="search-and-button">
    <search-box v-model="params.currency" placeholder="输入单号"/>
    <nuxt-link to="/owner/stock/allot/create" tag="div" class="add-button">
      <mt-button type="primary" size="small" plain>新增</mt-button>
    </nuxt-link>
  </div>
</template>

<script>
import Search from '@/components/share/Search'

export default {
  name: 'PurchaseSearch',
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
.search-and-button {
  display: flex;
  padding: 10px;
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
