<template>
  <div class="date-range">
    <span class="label">日期区间：</span>
    <div class="input start" @click="openStartPicker">
      <template v-if="hasStartDate">
        <span class="date-text">{{ showStartDate }}</span>
      </template>
      <template v-else>
        <span class="placeholder">开始日期</span>
      </template>
    </div>
    <span class="sep">-</span>
    <div class="input end" @click="openEndPicker">
      <template v-if="hasEndDate">
        <span class="date-text">{{ showEndDate }}</span>
      </template>
      <template v-else>
        <span class="placeholder">结束日期</span>
      </template>
    </div>

    <mt-datetime-picker
      ref="picker"
      v-model="pickerDate"
      type="date"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      :start-date="minDate"
      :end-date="maxDate"
      @confirm="onPickerConfirm"
    />
  </div>
</template>
<script>
const DateStyle = 'YYYY-MM-DD'

export default {
  name: 'DateRange',
  props: {
    filters: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      start: undefined,
      end: undefined,
      minDate: undefined,
      maxDate: undefined,
      pickerDate: new Date(),
      pickerDateType: 'start'
    }
  },
  computed: {
    showStartDate() {
      return this.$format(this.filters.startTime, DateStyle)
    },
    showEndDate() {
      return this.$format(this.filters.endTime, DateStyle)
    },
    hasStartDate() {
      return !!this.filters.startTime
    },
    hasEndDate() {
      return !!this.filters.endTime
    }
  },

  methods: {
    openStartPicker() {
      this.pickerDateType = 'start'
      this.pickerDate = new Date()
      this.minDate = undefined
      if (this.hasStartDate) {
        this.pickerDate = new Date(this.filters.startTime)
      }
      if (this.hasEndDate) {
        this.maxDate = new Date(this.filters.endTime)
      }

      this.$refs.picker.open()
    },
    openEndPicker(type, currentDate) {
      this.pickerDateType = 'end'
      this.pickerDate = new Date()
      this.maxDate = undefined
      if (this.hasEndDate) {
        this.pickerDate = new Date(this.filters.endTime)
      }
      if (this.hasStartDate) {
        this.minDate = new Date(this.filters.startTime)
      }
      this.$refs.picker.open()
    },
    onPickerConfirm(pickerDate) {
      this[this.pickerDateType] = pickerDate
      this.minDate = undefined
      this.maxDate = undefined
      this.$emit(this.pickerDateType, this.$format(pickerDate, DateStyle))
    }
  }
}
</script>
<style lang="scss" scoped>
.date-range {
  display: flex;
  align-items: center;
  > .label {
    color: #999;
    width: 5em;
    flex-shrink: 0;
    font-size: 12px;
  }
  > .input {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 80px;
    border-radius: 4px;
    background-color: #e9e9e9;
    font-size: 12px;
    > .placeholder {
      color: #666;
    }
  }
  .sep {
    margin: 0 10px;
  }
}
</style>
