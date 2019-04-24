<template>
  <div class="status">
    <Multiple v-model="status" :list-render="fetch">
      <template v-slot:default="scope">
        <FilterButton :active="scope.option.isActive">
          <span>{{ scope.option.item.name }}</span>
        </FilterButton>
      </template>
    </Multiple>
  </div>
</template>
<script>
import Multiple from '@/components/share/filter/Multiple'
import FilterButton from '@/components/share/filter/Button'

let Status = require('@/constant/status')
export default {
  name: 'FilterProvider',
  components: {
    Multiple,
    FilterButton
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: this.value
    }
  },
  watch: {
    status(newStatus) {
      this.$emit('change', newStatus)
    },
    value(newValue) {
      this.status = newValue
    }
  },
  methods: {
    fetch() {
      return new Promise(resolve => {
        let statusList = Status[this.type]
        let keys = Object.keys(statusList)
        let list = keys.map(key => ({
          label: key,
          name: statusList[key]
        }))
        resolve(list)
      })
    }
  }
}
</script>
