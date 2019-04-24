<template>
  <div class="multiple">
    <div class="options">
      <MultipleOption
        v-for="item in options"
        :key="item.label"
        :value="item.label"
      >
        <slot
          :option="{
            item,
            isActive: checkActive(item)
          }"
        />
      </MultipleOption>
    </div>
  </div>
</template>

<script>
import MultipleOption from './MultipleOption'

export default {
  name: 'WmsMultiple',
  components: {
    MultipleOption
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 条件值
    value: Array,
    // 选项
    list: {
      type: Array
    },
    listRender: {
      type: Function
    }
  },

  data() {
    return {
      conditionValue: this.value,
      options: null
    }
  },
  computed: {
    isNotEmpty() {
      return this.options && this.options.length > 0
    }
  },
  watch: {
    conditionValue(newVal) {
      this.$emit('change', this.conditionValue)
    },
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.conditionValue = newVal
      }
    },
    list(newList, oldList) {
      this.options = newList
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let list = []
      if (this.list && this.list.length) {
        list = this.list
      } else if (this.listRender) {
        list = await this.listRender()
      }
      this.options = list
    },

    checkActive(item) {
      return this.value.includes(item.label)
    }
  }
}
</script>

<style lang="scss" scoped>
.multiple {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -8px;
  /deep/ .option {
    flex-shrink: 0;
    margin-top: 8px;
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
