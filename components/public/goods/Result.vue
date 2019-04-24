<template>
  <div class="result">
    <Types class="result--types" :group-types="groupTypes" @change="onTypeSelectedChange"/>
    <AsyncLoader class="result--list" :loader="fetch" @success="onFetchSuccess">
      <template slot-scope="all">
        <span v-show="false">{{ all.length }}</span>
        <List ref="list" :list="showGoodsList" @change="onItemSelectedChange"/>
      </template>
    </AsyncLoader>
    <AddupButtons :list="selectedList" @clear="onClear"/>
  </div>
</template>

<script>
import { groupBy, filter } from 'lodash'

import AsyncLoader from '@/components/share/async-loader'
import AddupButtons from './AddupButtons'
import Types from './Types'
import List from './List'
import { getGoodsList } from '@/api/public'
export default {
  name: 'Result',
  components: {
    AddupButtons,
    AsyncLoader,
    Types,
    List
  },

  data() {
    return {
      showType: '',
      list: [],
      selectedList: [],
      groupTypes: {}
    }
  },

  computed: {
    showGoodsList() {
      let list = []
      if (this.showType) {
        list = filter(this.list, item => item.categoryUkid === this.showType)
      } else {
        list = [...this.list]
      }
      return list
    }
  },

  methods: {
    // async init() {
    //   let { success, data } = await this.fetch()
    //   if (success) {
    //     this.list = data.map(item => {
    //       return Object.assign(item, {
    //         count: 0,
    //         unitPrice: item.perUnitPrice
    //       })
    //     })
    //   }
    // },
    fetch() {
      return getGoodsList()
    },
    onFetchSuccess(list = []) {
      let { purchase: isPurchase } = this.$route.query
      this.list = list.map(item => {
        return Object.assign(item, {
          count: 0,
          unitPrice: item[isPurchase ? 'perUnitCost' : 'perUnitPrice']
        })
      })
    },
    onItemSelectedChange(list) {
      this.groupTypes = groupBy(list, item => item.categoryUkid)
      this.selectedList = list
      this.$emit('change', list)
    },
    onTypeSelectedChange(categoryUkid) {
      this.showType = categoryUkid
    },
    onClear() {
      this.$refs.list.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: row;

  &--types {
    flex: 1 0 20%;
    height: calc(100vh - 48px - 60px);
    box-shadow: inset -1px 0px 1px 0px rgba(190, 190, 190, 0.5);
    overflow-y: auto;
  }

  &--list {
    flex: 1 100%;
    height: calc(100vh - 48px - 60px);
    overflow-y: auto;
  }
}
</style>
