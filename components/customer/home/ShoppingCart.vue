<template>
  <nuxt-link to="/customer/cart" tag="div" class="shopping-cart">
    <span class="brige">{{ count }}</span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-shopping-cart" />
    </svg>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartIcon',
  computed: {
    ...mapGetters({
      count: 'cart/count'
    })
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  position: fixed;
  bottom: 100px;
  right: 10px;
  > .brige {
    position: absolute;
    top: 4px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    padding: 0 5px;
    border-radius: 8px;
    background: #26a2ff;
    border: 2px solid #fff;
    color: #fff;
    font-size: 10px;
  }
  > .icon {
    width: 40px;
    height: 40px;
    color: #333;
  }
}
</style>
