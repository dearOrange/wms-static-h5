<template>
  <div class="stock--search">
    <mt-search v-model="value" :result="filterResult" class="mt__search">
      <div v-for="item in filterResult" :key="item.id">
        <slot/>
      </div>
    </mt-search>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      value: '蛋糕',
      defaultResult: [
        {
          title: '草莓牛奶慕斯生日蛋糕',
          id: 1
        },
        {
          title: '巧克力慕斯生日蛋糕',
          id: 2
        },
        {
          title: '草莓牛奶生日蛋糕',
          id: 3
        },
        {
          title: '草莓慕斯生日蛋糕',
          id: 4
        },
        {
          title: '巧克力牛奶生日蛋糕',
          id: 5
        },
        {
          title: '巧克力牛奶慕斯生日蛋糕',
          id: 6
        }
      ]
    }
  },
  computed: {
    filterResult() {
      return this.defaultResult.filter(value =>
        new RegExp(this.value, 'i').test(value.title)
      )
    }
  }
}
</script>

<style>
.mt__search .mint-search-list {
  top: 10px;
}
</style>
<style lang="scss" scoped>
.stock--search {
  width: 100%;
  position: absolute;
  top: 88px;
  z-index: 0;
}
.mt__search {
  padding: 10px;
}
</style>
