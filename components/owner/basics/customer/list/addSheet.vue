<template>
  <div class="order-sheet-box">
    <div class="layer"/>
    <div class="order-sheet">
      <h2>生成客户账号</h2>
      <div class="order-layer">
        <wms-cell title="姓名" :value="params.userName"/>
        <wms-cell title="用户名" :value="params.userAccount"/>
        <!-- <wms-field v-model.trim="params.password" title="密码" placeholder="请输入密码"/> -->
      </div>
      <!-- <div class="order-default-pwd">
        <span @click="restore">使用默认密码</span>
      </div>-->
      <div class="btns">
        <div @click="cancel">取消</div>
        <div class="btn_border" @click="sure">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddSheet',
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    cancel() {
      this.$emit('change')
    },
    sure() {
      this.$emit('submit', this.params)
    },
    restore() {
      this.params.password = 'nlwj123456'
    }
  }
}
</script>

<style lang="scss" scoped>
.order-sheet-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 6;
}
.layer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 7;
  background-color: rgba(255, 255, 255, 0.65);
}
.order-sheet {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 10;
  > h2 {
    padding: 10px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.65);
  }
  > .order-layer {
    width: 100%;
    padding: 10px 0;
    background: #fff;
    box-shadow: inset 0px 1px 3px 0px rgba(126, 126, 126, 0.53);
    /deep/ .field {
      height: 32px;
    }
  }
  > .order-default-pwd {
    padding: 10px 10px 20px;
    text-align: right;
  }
  > .btns {
    display: flex;
    border-top: 1px solid #ccc;
    > div {
      padding: 20px 0;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > .btn_border {
      border-left: 1px solid #999;
    }
    background: #fff;
  }
}
.order-small {
  display: flex;
  justify-content: flex-end;
}
</style>
