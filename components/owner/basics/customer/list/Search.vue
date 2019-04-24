<template>
  <div class="search-and-button">
    <search-box v-model="params.customerName" placeholder="输入客户名称"/>
    <nuxt-link to="/owner/basics/customer/create" tag="div" class="add-button">
      <mt-button type="primary" size="small" plain>新增</mt-button>
    </nuxt-link>
    <nuxt-link to="/owner/basics/customer/share" tag="div" class="add-button">
      <mt-button type="primary" size="small" plain>邀请</mt-button>
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
  padding: 8px 10px;

  .add-button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 0 12px;
    // border: 1px solid #ccc;
    margin-left: 10px;
  }
}
</style>
