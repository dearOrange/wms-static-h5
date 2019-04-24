<template>
  <div class="depot">
    <Single v-model="depot" :list-render="fetch">
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
import { getDepotList, getDepotListFromCustomer } from '@/api/public'
export default {
  name: 'FilterDepot',
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
    },
    specific: {
      type: Boolean
    }
  },
  data() {
    return {
      depot: this.value
    }
  },
  watch: {
    depot(newValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    async fetch() {
      let { success, data } = await (this.specific
        ? getDepotListFromCustomer()
        : getDepotList())
      if (success) {
        data = data.map(({ stockId, stockName }) => ({
          label: stockId,
          name: stockName
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
