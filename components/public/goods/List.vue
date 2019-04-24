<template>
  <div class="list">
    <template v-for="item in list">
      <div :key="'item-' + item.productItemUkid" class="item">
        <Checkbox
          class="item--checkbox"
          :init-checked="checkSelected(item)"
          @change="changeSelected($event, item)"
        />
        <GoodsCard class="item--goods" :data="wrapCountItem(item)" @countChange="countChange(item, $event)"/>
      </div>
      <div :key="'sep-' + item.productItemUkid" class="sep"/>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { find, remove, unionBy, cloneDeep } from 'lodash'

import GoodsCard from './GoodsCard'
import Checkbox from './Checkbox'

export default {
  name: 'List',
  components: {
    GoodsCard,
    Checkbox
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedList: []
    }
  },

  computed: {
    ...mapGetters({
      storedList: `public/goods`
    })
  },

  watch: {
    selectedList(newList) {
      this.$emit('change', newList)
    }
  },

  mounted() {
    this.selectedList = [...this.storedList]
  },

  methods: {
    clear() {
      this.selectedList = []
    },
    addSelectedItem(item) {
      this.selectedList = [...this.selectedList, item]
    },
    delSelectedItem(item) {
      remove(this.selectedList, selectedItem => {
        return item.productItemUkid === selectedItem.productItemUkid
      })
      this.selectedList = [...this.selectedList]
    },
    /**
     * * 新增/删除选中项数据
     * @param isAdd 是否新增
     * @param item 数据项
     */
    changeSelected(isAdd, item) {
      !isAdd ? this.delSelectedItem(item) : this.addSelectedItem(item)
    },

    countChange(item, count) {
      if (!this.checkSelected(item)) {
        this.addSelectedItem(
          Object.assign(cloneDeep(item), {
            count,
            _selected: true
          })
        )
      } else {
        this.selectedList = unionBy(
          [
            Object.assign(cloneDeep(item), {
              count,
              _selected: true
            })
          ],
          this.selectedList,
          'productItemUkid'
        )
      }
    },

    /**
     * * 根据已知已选项数据, 判断当前数据项是否已选状态
     * @param target 当前数据项
     */
    checkSelected(target) {
      let foundItem = find(this.selectedList, item => {
        return item.productItemUkid === target.productItemUkid
      })
      return !!foundItem
    },

    wrapCountItem(target) {
      let foundItem = find(this.selectedList, selectedItem => {
        return selectedItem.productItemUkid === target.productItemUkid
      })
      if (foundItem) {
        return foundItem
      }
      return target
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    align-items: center;
    padding: 10px;
    .item--checkbox {
      margin-right: 5px;
    }
    .item--goods {
      flex: 1 auto;
    }
  }
  .sep {
    width: 100%;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
}
</style>
