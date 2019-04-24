<template>
  <div>
    <tab-filter
      :is-template="isTemplate"
      :filters="[
        {
          label: '仓库',
          type: 'B'
        },
        {
          label: '时间',
          type: 'A'
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
          <select-classify v-if="typeStr === 'B'" v-model="params.stockId" :filters="ListData"/>
        </template>
      </SelectBox>
    </template>
  </div>
</template>

<script>
import TabFilter from '@/components/owner/report/sale/tab/filter'
import Select from '@/components/owner/report/sale/tab/select'
import SelectStore from '@/components/owner/report/sale/tab/store'
import SelectClassify from '@/components/owner/report/sale/tab/classify'
import { wareList } from '@/api/owner/stock'
export default {
  name: 'Tabs',
  components: {
    TabFilter,
    SelectBox: Select,
    SelectStore,
    SelectClassify
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
      ListData: []
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
      let { success, data } = await wareList()
      if (success) {
        this.ListData = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs__box {
  width: 50vw;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  background: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
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
