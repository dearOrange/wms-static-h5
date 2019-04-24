<template>
  <div class="desc">
    <p>{{ data.productItemDesc }}</p>
  </div>
</template>
<script>
export default {
  name: 'GoodsDesc',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.desc {
  padding: 10px;
}
</style>
