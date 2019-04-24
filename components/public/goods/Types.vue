<template>
  <ul class="types">
    <li :class="{active: '' === selectedType}" @click="onTypeClick('')">
      <TypeItem title="全部"/>
    </li>
    <template v-for="item in list">
      <li :key="item.categoryUkid" :class="{active: item.categoryUkid === selectedType}" @click="onTypeClick(item.categoryUkid)">
        <TypeItem :title="item.categoryName" :count="groupTypes[item.categoryUkid] ? groupTypes[item.categoryUkid].length : 0"/>
      </li>
    </template>
  </ul>
</template>

<script>
// import AsyncLoader from '@/components/share/async-loader'
import TypeItem from './TypeItem'

import { cateType as getCateTypeList } from '@/api/public'
export default {
  name: 'Types',
  components: {
    TypeItem
  },
  props: {
    groupTypes: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      selectedType: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let { success, data } = await this.fetch()
      if (success) {
        this.list = data
      }
    },
    fetch() {
      return getCateTypeList()
    },
    onTypeClick(typeId = '') {
      this.selectedType = typeId
      this.$emit('change', typeId)
    }
  }
}
</script>

<style lang="scss" scoped>
ul.types {
  > li {
    border-bottom: 1px solid rgba(190, 190, 190, 0.5);
    &.active {
      background-color: rgba(38, 162, 255, 0.1);
    }
  }
}
</style>
