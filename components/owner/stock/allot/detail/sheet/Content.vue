<template>
  <div class="content">
    <div v-if="dataStatus === 300 || dataStatus === 600" class="content--hd">
      <span>计划数</span>
      <span>调出数</span>
      <span>调入数</span>
    </div>
    <div v-else class="content--hd">
      <span>计划数</span>
      <span>单价</span>
      <span>金额</span>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(150, 150, 150, 0.25)"/>
    <div class="content--bd">
      <ul class="list">
        <template v-for="item in list">
          <li :key="'sheet-item_' + item.productItemUkid">
            <Item :dataStatus="dataStatus" :data="item"/>
          </li>
        </template>
      </ul>
      <wms-whitespace size="4" bgcolor="rgba(150, 150, 150, 0.25)" style="margin: 15px 0;"/>
      <Total :dataStatus="dataStatus" :list="list"/>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import Total from './Total'

export default {
  name: 'SheetContent',
  components: {
    Item,
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
    },
    dataStatus: {
      type: Number
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
      text-align: center;
    }
  }
  .content--bd {
    padding: 12px 0;
    > .list {
      padding: 10px;
      max-height: 200px;
      overflow-y: auto;
    }
  }
}
</style>
