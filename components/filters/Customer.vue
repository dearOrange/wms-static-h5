<template>
  <div class="customer">
    <Single v-model="customer" :list-render="fetch">
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

import { getCustomerList } from '@/api/public'
export default {
  name: 'FiltersCustomer',
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
      customer: this.value
    }
  },
  watch: {
    customer(newValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    async fetch() {
      let { success, data } = await getCustomerList()
      if (success) {
        data = data.map(({ customerId, customerName }) => ({
          label: customerId,
          name: customerName
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
