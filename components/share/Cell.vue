<template>
  <div class="cell" @click="clickCell">
    <div :class="{'cell--color': color}" class="cell--lt">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div :class="{'cell--va': shownValue === '全部收货' || shownValue === '全部发货'}" class="cell--md">
      <slot name="value">
        <span>{{ shownValue }}</span>
      </slot>
    </div>
    <div class="cell--rt">
      <slot name="rt-icon">
        <span v-if="rtIsArrow" class="cell--arrow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rt-arrow"></use>
          </svg>
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WmsCell',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clickable: {
      type: Boolean
    },
    isLink: {
      type: Boolean
    },
    to: {
      type: String,
      default: ''
    },
    color: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    shownValue() {
      return this.value === '' || this.value == null
        ? this.placeholder
        : this.value
    },
    rtIsArrow() {
      return this.clickable || this.isLink
    }
  },

  methods: {
    clickCell() {
      if (this.clickable) {
        this.$emit('click')
      }

      if (this.isLink) {
        if (!this.to) {
          console.error('请指定跳转属性to')
        }
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 32px;

  > .cell--lt {
    color: #888;
  }
  > .cell--color {
    color: #000;
  }
  > .cell--md {
    flex: 1 auto;
    display: flex;
    justify-content: flex-end;
  }
  > .cell--rt {
    .cell--arrow {
      color: #888;
    }
  }
}
.cell--va {
  color: #4caf50;
}
</style>
