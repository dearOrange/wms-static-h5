<template>
  <div>
    <tab-filter
      :is-template="isTemplate"
      :filters="[
        {
          label: store,
          type: 'A'
        },
        {
          label: classify,
          type: 'B'
        },
        {
          label: sort,
          type: 'C'
        }
      ]"
      @change="changeItem"
    />
    <template v-if="isTemplate">
      <SelectBox>
        <template slot="SelectName">
          <select-store
            v-if="typeStr === 'A'"
            v-model="params.stockId"
            :filters="ListData"
            @change="sureBtn"
          />
          <select-classify
            v-if="typeStr === 'B'"
            v-model="params.categoryName"
            :filters="catesData"
            @change="sureBtn"
          />
          <select-sort
            v-if="typeStr === 'C'"
            v-model="params.accordingSort"
            @change="sureBtn"
            :filters="[
              {
                label: '综合',
                type: 'A'
              },
              {
                label: '库存从大到小',
                type: 'B'
              },
              {
                label: '库存从小到大',
                type: 'C'
              },
              {
                label: '商品编码',
                type: 'D'
              }
            ]"
          />
        </template>
      </SelectBox>
    </template>
  </div>
</template>

<script>
import TabFilter from '@/components/owner/stock/common/tabs/filter'
import Select from '@/components/owner/stock/common/tabs/select'
import SelectStore from '@/components/owner/stock/common/tabs/store'
import SelectClassify from '@/components/owner/stock/common/tabs/classify'
import SelectSort from '@/components/owner/stock/common/tabs/sort'
import { categoryList } from '@/api/public'
import { wareList } from '@/api/owner/stock'
export default {
  name: 'Tabs',
  components: {
    TabFilter,
    SelectBox: Select,
    SelectStore,
    SelectClassify,
    SelectSort
  },
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      isTemplate: false,
      typeStr: '',
      catesData: [],
      ListData: [],
      store: '仓库',
      classify: '分类',
      sort: '排序'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    changeItem(type) {
      this.isTemplate = true
      this.typeStr = type
    },
    sureBtn(value) {
      console.log(value)
      this.isTemplate = false
      this.$emit('confirm')
    },
    async getList() {
      let { success: success1, data: cateData } = await categoryList()
      if (success1) {
        this.catesData = cateData
      }
      let { success: success2, data: ListData } = await wareList()
      if (success2) {
        this.ListData = ListData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs__box {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  background: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 48px;
  left: 0;
  z-index: 1;
  & > li {
    margin: 0;
    flex: 1;
    padding: 10px 0;
    display: flex;
    &:nth-of-type(2) {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
    & > .arrow-desc {
      flex: 1;
      text-align: center;
    }
    & .arrow-up {
      position: relative;
      &:before {
        content: '';
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #ccc;
        position: absolute;
        left: -28px;
        top: 2px;
      }
    }
    & .arrow-down {
      position: relative;
      &:before {
        content: '';
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #ccc;
        position: absolute;
        left: -28px;
        top: 13px;
      }
    }
  }
}
</style>
