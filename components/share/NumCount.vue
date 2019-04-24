<template>
  <div class="num-count">
    <span :class="{ disabled: isMinimum }" class="btn minus" @click.stop="minus">－</span>
    <span class="content" @click="showPopup">{{ shownCount }}</span>
    <span :class="{ disabled: isMaximum }" class="btn plus" @click.stop="plus">＋</span>

    <div v-if="isPopup" class="prompt-count" @click.self="hidePopup">
      <div class="inner">
        <div class="title">请填写需要的数量</div>
        <div class="input">
          <input ref="input" v-model="popupInputCount" type="number">
          <div v-if="!popupInputIsRight" class="error">{{ popupInputErrorMsg }}</div>
        </div>
        <div class="buttons">
          <span @click="hidePopup">取消</span>
          <span @click="confirm">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { MessageBox } from 'mint-ui'
import { isNumber, gt, lt } from 'lodash'
export default {
  name: 'WmsNumCount',
  model: {
    prop: 'count',
    event: 'change'
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 999999
    },
    min: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      innerCount: this.count,
      isPopup: false,
      popupInputCount: 0,
      popupInputIsRight: true,
      popupInputErrorMsg: ''
    }
  },

  computed: {
    shownCount() {
      return this.innerCount
    },

    isMinimum() {
      return this.innerCount === this.min
    },

    isMaximum() {
      return this.innerCount === this.max
    }
  },

  watch: {
    count(newCount) {
      this.innerCount = newCount
    },
    popupInputCount(newCount) {
      this.validate()
    }
  },

  methods: {
    hidePopup() {
      this.popupInputCount = 0
      this.isPopup = false
    },
    validate() {
      if (!isNumber(+this.popupInputCount)) {
        this.popupInputIsRight = false
        this.popupInputErrorMsg = '请输入正确的数字'
      } else if (gt(this.popupInputCount, this.max)) {
        this.popupInputIsRight = false
        this.popupInputErrorMsg = `数量不能超过最大值${this.max}`
      } else if (lt(this.popupInputCount, this.min)) {
        this.popupInputIsRight = false
        this.popupInputErrorMsg = `数量不能低于最小值${this.min}`
      } else {
        this.popupInputIsRight = true
      }
    },
    showPopup() {
      this.popupInputCount = this.innerCount
      this.isPopup = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    confirm() {
      if (!this.popupInputIsRight) {
        this.$refs.input.focus()
        return
      }
      this.innerCount = this.popupInputCount
      this.hidePopup()
      this.$emit('change', +this.innerCount)
    },
    minus() {
      let value = this.innerCount
      let min = this.min
      if (value === min) {
        return
      }
      let minusValue = value - this.step
      if (minusValue < min) {
        this.innerCount = min
      } else {
        this.innerCount = minusValue
      }
      this.$emit('change', this.innerCount)
    },

    plus() {
      let value = this.innerCount
      let max = this.max
      if (value === max) {
        return
      }
      let plusValue = value + this.step
      if (plusValue > max) {
        this.innerCount = max
      } else {
        this.innerCount = plusValue
      }
      this.$emit('change', this.innerCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.num-count {
  display: flex;
  align-items: center;
  justify-content: center;

  > .btn {
    padding: 2px 8px;
    font-weight: 700;
    font-size: 12px;
    &.disabled {
      color: #999;
    }
  }
  > .content {
    width: 30px;
    padding: 2px 0;
    text-align: center;
    background: #e5e5e5;
    font-weight: 400;
    font-size: 12px;
  }
}

.prompt-count {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  > .inner {
    position: relative;
    width: 80%;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 4px;
    > .title {
      text-align: center;
      font-size: 16px;
    }
    > .input {
      margin: 15px 0;
      input {
        display: block;
        width: 100%;
        height: 40px;
        padding: 0;
        text-indent: 10px;
      }
      .error {
        margin-top: 5px;
        color: red;
        font-size: 12px;
      }
    }

    > .buttons {
      display: flex;
      > span {
        display: block;
        text-align: center;
        flex: 1;
      }
    }
  }
}
</style>
