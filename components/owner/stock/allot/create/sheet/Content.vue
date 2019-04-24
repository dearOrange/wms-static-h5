<template>
  <div class="content">
    <div class="content--hd">
      <span>数量</span>
      <span>单价</span>
      <span>金额</span>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(150, 150, 150, 0.25)"/>
    <div class="content--bd">
      <ul class="list">
        <template v-for="item in list">
          <li :key="'sheet-item_' + item.allocationUkid">
            <Goods :data="item"/>
          </li>
        </template>
      </ul>
      <wms-whitespace size="4" bgcolor="rgba(150, 150, 150, 0.25)" style="margin: 15px 0;"/>
      <Total :list="list"/>
    </div>
  </div>
</template>

<script>
import Goods from './Goods'
import Total from './Total'

export default {
  name: 'SheetContent',
  components: {
    Goods,
    Total
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    shown: {
      type: Boolean
    }
  },
  methods: {
    hide() {
      this.$emit('update:shown', false)
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
    }
  }
  .content--bd {
    padding: 12px 0;
    > .list {
      padding: 0 10px;
    }
  }
}
</style>
