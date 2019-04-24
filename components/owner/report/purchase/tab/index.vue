<template>
  <div>
    <tab-filter
      :is-template="isTemplate"
      :filters="[
        {
          label: '分类',
          type: 'B'
        },
        {
          label: '时间',
          type: 'A'
        },
        {
          label: '排序',
          type: 'C'
        }
      ]"
      @change="changeItem"
    />
    <template v-if="isTemplate">
      <SelectBox @close="closeBtn" @submit="sureBtn">
        <template slot="SelectName">
          <select-store
            v-if="typeStr === 'A'"
            v-model="params.date"
            :filters="[
              
              {
                label: '今天',
                type: 't'
              },
              {
                label: '昨天',
                type: 'y'
              },
              {
                label: '本月',
                type: 'tm'
              },
              {
                label: '上月',
                type: 'lm'
              }
            ]"
          />
          <select-classify
            v-if="typeStr === 'B'"
            v-model="params.categoryUkid"
            :filters="catesData"
          />
          <select-sort
            v-if="typeStr === 'C'"
            v-model="params.sort"
            :filters="[
              {
                label: '采购数量从多到少',
                type: 'qtyDesc'
              },
              {
                label: '采购数量从少到多',
                type: 'qtyAsc'
              },
              {
                label: '采购金额从多到少',
                type: 'priceDesc'
              },
              {
                label: '采购金额从少到多',
                type: 'priceAsc'
              }
            ]"
          />
        </template>
      </SelectBox>
    </template>
  </div>
</template>

<script>
import TabFilter from '@/components/owner/report/purchase/tab/filter'
import Select from '@/components/owner/report/purchase/tab/select'
import SelectStore from '@/components/owner/report/purchase/tab/store'
import SelectClassify from '@/components/owner/report/purchase/tab/classify'
import SelectSort from '@/components/owner/report/purchase/tab/sort'
import { categoryList } from '@/api/public'
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
      catesData: []
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
    closeBtn() {
      this.isTemplate = false
    },
    sureBtn() {
      this.isTemplate = false
      this.$emit('confirm')
    },
    async getList() {
      let { success: success1, data: cateData } = await categoryList()
      if (success1) {
        this.catesData = cateData
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
