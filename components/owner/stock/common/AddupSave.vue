<template>
  <div class="addup-save">
    <div class="skeleton"/>
    <div class="fixed-inner">
      <div class="addup" @click="toggleSheet">
        <div class="item amount">
          <span>数量：</span>
          <span>{{ dataNum }}</span>
        </div>
        <div class="item price">
          <span>金额：</span>
          <span>{{ dataPrice | CNY }}</span>
        </div>
      </div>
      <div class="save">
        <span>保存</span>
      </div>
    </div>
    <template v-if="isOnSheet">
      <OrderSheet :data="data"/>
    </template>
  </div>
</template>

<script>
import OrderSheet from '@/components/owner/stock/common/sheet/OrderSheet'

export default {
  name: 'AddupSave',
  components: {
    OrderSheet
  },
  props: {
    dataNum: {
      type: Number,
      default: 0
    },
    dataPrice: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isOnSheet: false
    }
  },

  methods: {
    toggleSheet() {
      this.isOnSheet = !this.isOnSheet
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 60px;
.addup-save {
  position: relative;
  z-index: 9;
}
.skeleton {
  height: $height;
}
.fixed-inner {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  display: flex;
  width: 100%;
  height: $height;
  background-color: #fff;
  > .addup {
    flex: 1 0;
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 2px 1px 0px rgba(190, 190, 190, 0.5);
    > .item {
      width: 100%;
      padding: 0 10px;
    }
  }
  > .save {
    flex: 0 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #26a2ff;
    color: #fff;
  }
}
</style>
