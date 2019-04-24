<template>
  <div class="addup-buttons">
    <div class="skeleton"/>
    <div class="fixed-inner">
      <div class="addup">
        <div class="item amount">
          <span>数量：</span>
          <span>{{ addupCount }}</span>
        </div>
        <div class="item price">
          <span>金额：</span>
          <span>{{ addupPrice | CNY }}</span>
        </div>
      </div>
      <div class="buttons">
        <span class="cancel-btn" @click="cancel">取消</span>
        <span class="confirm-btn" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { sumBy } from 'lodash'
import { mapMutations } from 'vuex'

export default {
  name: 'AddupButtons',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },

  computed: {
    addupCount() {
      return sumBy(this.list, item => item.count || 0)
    },
    addupPrice() {
      return sumBy(this.list, item => {
        if (item) {
          return (item.count || 0) * item.unitPrice
        } else {
          return 0
        }
      })
    }
  },

  methods: {
    ...mapMutations({
      delGoods: 'public/delGoods',
      setGoods: 'public/setGoods'
    }),

    confirm() {
      this.setGoods(this.list)
      this.$router.go(-1)
    },
    cancel() {
      this.$emit('clear')
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 60px;
.addup-buttons {
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
  > .buttons {
    flex: 0 0 50%;
    display: flex;
    > span {
      flex: 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    > .confirm-btn {
      background-color: #26a2ff;
    }
    > .cancel-btn {
      background-color: #f34500;
    }
  }
}
</style>
