<template>
  <div class="single">
    <div class="options">
      <SingleOption
        v-for="item in options"
        :key="item.label"
        :value="item.label"
      >
        <slot
          :option="{
            item,
            isActive: item.label === value
          }"
        />
      </SingleOption>
    </div>
  </div>
</template>

<script>
import SingleOption from './SingleOption'

export default {
  name: 'WmsSingle',
  components: {
    SingleOption
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 选项值
    value: {
      type: [String, Number],
      required: true
    },
    // 选项列表
    list: {
      type: Array,
      default() {
        return []
      }
    },
    listRender: {
      type: Function
    },
    itemRender: {
      type: Function
    }
  },

  data() {
    return {
      radioValue: this.value,
      options: null
    }
  },
  computed: {
    isNotEmpty() {
      return this.options && this.options.length > 0
    },
    customLabelStyle() {
      let style = {}
      if (this.labelStyle) {
        style = this.labelStyle
      }
      return style
    }
  },
  watch: {
    radioValue(newVal) {
      this.$emit('change', this.radioValue)
    },
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.radioValue = newVal
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.single {
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
