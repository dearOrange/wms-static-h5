<template>
  <div class="picture">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in list" :key="index">
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  name: 'Oicture',
  props: {
    data: {
      type: Object
    }
  },

  computed: {
    list() {
      return this.data.photoUrls ? this.data.photoUrls.split(',') : []
    }
  }
}
</script>

<style lang="scss" scoped>
.picture {
  height: 240px;
  img {
    height: 240px;
    width: 100vw;
  }
}
</style>
