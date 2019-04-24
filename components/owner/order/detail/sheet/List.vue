<template>
  <ul class="list">
    <template v-for="(item) in data.ordDetailList">
      <li :key="'sheet-item_' + item.orderDetailUkid">
        <div class="item">
          <div class="item--title">
            <span>{{ item.productName }}</span>
            <span>{{ item.productItemName }}</span>
          </div>
          <div class="item--amount">
            <span>{{ item.orderQty }}</span>
            <span>{{ item.unitPrice * data.baOwnerCustomer.discount | CNY }}</span>
            <span>{{ item.orderQty * item.unitPrice * data.baOwnerCustomer.discount | CNY }}</span>
            <span v-if="isConfirm">{{ item.shippedQty }}</span>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    isConfirm: {
      type: Boolean
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
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
