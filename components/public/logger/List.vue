<template>
  <div class="list">
    <template v-for="(item, index) in list">
      <Item :key="'item_' + item.operationUkid" :data="item" :newest="index === 0"/>
      <wms-whitespace :key="'sep_' + item.operationUkid" size="10" bgcolor="rgba(0,0,0,.15)"/>
    </template>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'List',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
}
</script>
