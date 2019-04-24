<template>
  <div class="bullet" :class="{ active: actived }">
    <div class="fb-inner" @click="toggle">
      <span class="label">{{ showLabel }}</span>
      <span v-if="isChooseType" class="arrow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-down"></use>
        </svg>
      </span>
    </div>
    <div v-if="popupActived && isChooseType" class="fb-popup">
      <div class="content">
        <div class="choose-list">
          <template v-for="item in content">
            <div
              :key="item.value"
              class="item"
              :class="{
                active: checkChooseSelected(item.value)
              }"
              @click="chooseItem(item)"
            >
              <span class="text">{{ item.label }}</span>
              <svg class="icon gou" aria-hidden="true">
                <use xlink:href="#icon-gou"></use>
              </svg>
            </div>
          </template>
        </div>
      </div>
      <div v-if="multiple" class="buttons">
        <span class="cancel" @click="hide">取消</span>
        <span class="confirm" @click="confirm">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
import BulletContainer from '@/components/share/filter/BulletContainer'
import Bullet from '@/components/share/filter/Bullet'
import { isArray, find, remove, some, includes } from 'lodash'
export default {
  name: 'Bullet',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    label: {
      type: String,
      required: true
    },
    content: {
      type: [String, Number, Array],
      required: true
    },
    multiple: {
      type: Boolean
    }
  },

  data() {
    return {
      popupActived: false,
      choosedValue: null,
      bulletContainer: null
    }
  },

  computed: {
    showLabel() {
      if (this.isChooseType && this.hide && isArray(this.choosedValue)) {
        if (this.choosedValue.length > 0) {
          return this.choosedValue.map(item => item.label).join(',')
        } else {
          return this.label
        }
      }
      return this.label
    },
    isChooseType() {
      return isArray(this.content)
    },
    actived() {
      let chooseValue = this.choosedValue
      if (chooseValue) {
        if (this.isChooseType) {
          let firstValue = chooseValue[0]
          return some(chooseValue, item => item.value === firstValue.value)
        } else {
          return chooseValue === this.content
        }
      }
      return false
    }
  },

  watch: {
    popupActived(newActived) {
      if (newActived) {
        this.bulletContainer.showMask()
      } else {
        this.bulletContainer.hideMask()
      }
    }
  },

  mounted() {
    let parent = this.$parent
    while (parent) {
      if (includes(parent.$vnode.tag, BulletContainer.name)) {
        this.bulletContainer = parent
        break
      }
      parent = parent.$parent
    }
    if (!this.bulletContainer) {
      console.error(`
        请确保该组件${this.$vnode.tag}在<${BulletContainer.name}>容器下`)
    }
  },

  methods: {
    hide() {
      this.popupActived = false
    },
    show() {
      this.popupActived = true
    },
    toggle() {
      let siblings = this.siblings()
      siblings.forEach(comp => {
        if (comp._uid !== this._uid && comp.isChooseType) {
          comp.hide()
        }
      })
      if (this.isChooseType) {
        this.$nextTick(() => {
          this.popupActived = !this.popupActived
        })
      } else {
        this.choosedValue = this.choosedValue ? '' : this.content
        this.$emit('change', this.choosedValue)
      }
    },
    siblings() {
      let children = this.bulletContainer.$children
      let siblings = children.map(child => {
        let targetChild
        while (child) {
          if (child.$options.name === Bullet.name) {
            targetChild = child
            break
          } else {
            child = child.$children[0]
          }
        }
        return targetChild
      })
      return siblings
    },
    confirm() {
      this.hide()
      if (isArray(this.choosedValue)) {
        this.$emit('change', this.choosedValue.map(item => item.value))
      }
    },

    chooseItem(item) {
      this.choosedValue = this.choosedValue || []
      let foundItem = find(this.choosedValue, oItem => {
        return oItem.value === item.value
      })
      if (foundItem) {
        remove(this.choosedValue, oItem => {
          return oItem.value === foundItem.value
        })
      } else {
        this.choosedValue = [...(this.multiple ? this.choosedValue : []), item]
      }

      // 单选情况
      if (!this.multiple) {
        this.hide()
        // 之前已选中, 则取消
        this.$emit('change', foundItem ? '' : item.value)
      }
      this.choosedValue = [...this.choosedValue]
    },
    checkChooseSelected(value) {
      return (
        this.choosedValue &&
        some(this.choosedValue, item => item.value === value)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.bullet {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  border-radius: 4px;
  background-color: #e9e9e9;
  font-size: 12px;
  min-width: 80px;
  .arrow {
    margin-left: 3px;
  }
  &.active {
    .label {
      color: #26a2ff;
    }
    .arrow {
      color: #26a2ff;
    }
  }
}

.fb-popup {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  .buttons {
    height: 42px;
    display: flex;
    > span {
      flex: 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      &.cancel {
        background-color: #fff;
        color: #26a2ff;
        box-shadow: inset 0px 2px 1px 0px rgba(190, 190, 190, 0.5);
      }
      &.confirm {
        color: #fff;
        background-color: #26a2ff;
      }
    }
  }
}

.choose-list {
  padding: 0 10px;
  > .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    border-bottom: 1px solid #ccc;
    > .text {
      flex: 1 auto;
    }
    > .gou {
      display: none;
      width: 16px;
      height: 16px;
    }
    &:last-child {
      border-bottom: 0;
    }

    &.active {
      > .gou {
        display: block;
        color: #26a2ff;
      }
    }
  }
}
</style>
