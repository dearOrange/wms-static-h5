<template>
  <div class="base-info">
    <wms-cell title="采购日期" :value="dateText" clickable @click="pickDateTime"/>
    <ChooseProviderCell @change="data.supplierId = $event.supplierId"/>
    <ChooseDepotCell @change="data.stockId = $event.stockId"/>

    <mt-datetime-picker
      ref="picker"
      v-model="datetime"
      type="date"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import ChooseProviderCell from '@/components/share/ChooseProviderCell'
import ChooseDepotCell from '@/components/share/ChooseDepotCell'

export default {
  name: 'BaseInfo',
  components: {
    ChooseProviderCell,
    ChooseDepotCell
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      datetime: new Date(),
      lastDatetime: new Date()
    }
  },
  computed: {
    dateText() {
      return this.$format(this.lastDatetime, 'YYYY-MM-DD')
    }
  },
  watch: {
    lastDatetime: {
      handler(newDate) {
        this.data.purchaseDate = newDate
      },
      immediate: true
    },

    'data.purchaseDate': {
      handler(value) {
        this.lastDatetime = value
      }
    }
  },
  methods: {
    confirm(datetime) {
      this.lastDatetime = datetime
    },
    pickDateTime() {
      this.$refs.picker.open()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info {
  padding: 10px 0;
}
</style>
