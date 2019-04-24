<template>
  <div>
    <wms-cell :title="title" :value="shownDateText" clickable @click="pickDateTime"/>
    <mt-datetime-picker
      ref="picker"
      v-model="pickedDate"
      type="date"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      @confirm="confirm"
    />
  </div>
</template>

<script>
export default {
  name: 'ChooseDateCell',
  model: {
    prop: 'date',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: '订单日期'
    },
    date: {
      type: Date
    }
  },
  data() {
    return {
      pickedDate: new Date(),
      shownDate: null
    }
  },
  computed: {
    shownDateText() {
      let text = ''
      if (this.shownDate) {
        text = this.$format(this.shownDate, 'YYYY-MM-DD')
      }
      return text
    }
  },
  watch: {
    shownDate: {
      handler(newDate) {
        this.$emit('change', newDate)
      },
      immediate: true
    },

    date: {
      handler(newDate) {
        this.shownDate = newDate
        this.pickedDate = newDate
      },
      immediate: true
    }
  },
  methods: {
    confirm(pickedDate) {
      this.shownDate = pickedDate
    },
    pickDateTime() {
      this.$refs.picker.open()
    }
  }
}
</script>
