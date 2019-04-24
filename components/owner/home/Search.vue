<template>
  <div class="search-and-button">
    <search-box placeholder="输入商品名称查询库存"/>
    <!-- <nuxt-link to="/" tag="div" class="add-button"> -->
    <div class="add-button">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
    </div>
    <!-- </nuxt-link> -->
  </div>
</template>

<script>
import Search from '@/components/share/Search'

export default {
  name: 'HomeSearch',

  components: {
    SearchBox: Search
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
    margin-left: 15px;
  }
}
.icon {
  width: 30px;
  height: 30px;
  fill: #fff;
}
</style>
