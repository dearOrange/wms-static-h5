<template>
  <ul class="list">
    <template v-for="(item, index) in data.detailList">
      <li :key="'sheet-item_' + item.productItemUkid">
        <div class="item">
          <div class="item--title">
            <span>{{ storedGoodsList[index].productName }}</span>
            <span>{{ storedGoodsList[index].productItemName }}</span>
          </div>
          <div class="item--amount">
            <span>{{ item.backQty }}</span>
            <span>{{ item.refundUnitCost | CNY }}</span>
            <span>{{ item.backQty * item.refundUnitCost | CNY }}</span>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'List',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    ...mapGetters({
      storedGoodsList: 'public/goods'
    })
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  > li {
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  }
}
.item {
  // padding: 0 10px;
  > .item--title {
    display: flex;
    margin-bottom: 5px;
    > span {
      margin-left: 5px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  > .item--amount {
    display: flex;
    justify-content: center;
    > span {
      flex: 1 0;
      text-align: center;
    }
  }
}
</style>
