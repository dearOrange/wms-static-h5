<template>
  <div :class="{'border': borderRight}" class="item--box">
    <div class="title">{{ title }}</div>
    <div class="count">
      <span class="num">{{ count || 0 }}</span>
      <span>{{ label }}</span>
    </div>
    <div class="count">
      <span class="num">{{ money }}</span>
      <span>{{ amount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    borderRight: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number
    },
    money: {
      type: String
    },
    title: String,
    label: String,
    amount: String
  }
}
</script>

<style lang="scss" scoped>
.item--box {
  flex: 1;
  border-right: 1px solid #9bc5f9;
  padding: 0 15px;
  color: #fff;
  > .title {
    font-size: 16px;
    margin-bottom: 4px;
  }
  > .count {
    display: flex;
    flex-direction: column;
    > span {
      margin: 3px 0;
    }
    > .num {
      font-size: 18px;
    }
  }
}
.border {
  border: 0;
}
</style>
