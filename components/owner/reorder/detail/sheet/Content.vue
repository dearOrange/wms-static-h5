<template>
  <div class="content">
    <div class="content--hd">
      <span>数量</span>
      <span>单价</span>
      <span>金额</span>
      <span v-if="isConfirm">已收货数</span>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(150, 150, 150, 0.25)"/>
    <div class="content--bd">
      <List :data="data" :is-confirm="isConfirm"/>
      <wms-whitespace size="4" bgcolor="rgba(150, 150, 150, 0.25)" style="margin: 15px 0;"/>
      <Total :data="data" :is-confirm="isConfirm"/>
    </div>
  </div>
</template>

<script>
import List from './List'
import Total from './Total'

export default {
  name: 'SheetContent',
  components: {
    List,
    Total
  },
  props: {
    isConfirm: {
      type: Boolean
    },
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .content--hd {
    display: flex;
    justify-content: center;
    padding: 10px;
    > span {
      flex: 1 0;
      text-align: center;
    }
  }
}
</style>
