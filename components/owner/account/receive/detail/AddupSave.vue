<template>
  <div class="addup-save">
    <div class="skeleton"/>
    <div class="fixed-inner">
      <div class="addup">
        <div class="item amount">
          <span>本次收款：</span>
          <span>{{ receiveAccount | CNY }}</span>
        </div>
        <div class="item price">
          <span>剩余金额：</span>
          <span>{{ balanceNum | CNY }}</span>
        </div>
      </div>
      <div class="save">
        <span @click="accountOwn">结算</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddupSave',
  props: {
    receiveAccount: {
      type: String
    },
    balanceNum: {
      type: Number
    }
  },

  methods: {
    accountOwn() {
      this.$emit('change')
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
