<template>
  <div class="customer">
    <Title :text="title"/>
    <wms-whitespace size="10" />
    <template v-for="item in list">
      <div :key="item.ownerId">
        <Button :text="item.ownerName" @click="onClick(item)"/>
        <wms-whitespace size="10" />
      </div>
    </template>
  </div>
</template>

<script>
import Title from './Title'
import Button from './Button'
export default {
  name: 'Customer',
  components: {
    Title,
    Button
  },

  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: '我是客户'
    }
  },
  methods: {
    onClick(item) {
      this.$emit('pick', item)
    }
  }
}
</script>
