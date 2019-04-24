<template>
  <div class="product--content">
    <div class="product--img">
      <div>
        <img src alt>
      </div>
      <p>库存：87</p>
    </div>
    <div class="product--name">
      <p>草莓牛奶慕斯生日蛋糕</p>
      <p>850g8盒 / 箱</p>
    </div>
    <div v-if="removed" class="remove-btn">删除</div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    removed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.product--content {
  display: flex;
  margin: 0 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  & > .product--img {
    width: 80px;
    height: 60px;
    border: 1px solid #ccc;
    & > div {
      width: 100%;
      height: 40px;
    }
    & > p {
      text-align: center;
    }
  }
  & > .product--name {
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  & > .remove-btn {
    display: flex;
    align-items: center;
  }
}
</style>
