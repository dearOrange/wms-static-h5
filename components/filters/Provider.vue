<template>
  <div class="provider">
    <Single v-model="provider" :list-render="fetch">
      <template v-slot:default="scope">
        <FilterButton :active="scope.option.isActive">
          <span>{{ scope.option.item.name }}</span>
        </FilterButton>
      </template>
    </Single>
  </div>
</template>
<script>
import Single from '@/components/share/filter/Single'
import FilterButton from '@/components/share/filter/Button'
import { concat } from 'lodash'

import { getProviderList } from '@/api/public'

export default {
  name: 'FilterProvider',
  components: {
    Single,
    FilterButton
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      provider: this.value
    }
  },
  watch: {
    provider(newValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    async fetch() {
      let { success, data } = await getProviderList()
      if (success) {
        data = data.map(({ supplier }) => ({
          label: supplier.supplierId,
          name: supplier.supplierName
        }))
        data = concat({ label: '', name: '全部' }, data)
        return data
      } else {
        return []
      }
    }
  }
}
</script>
