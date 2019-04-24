<template>
  <div class="base-info">
    <div class="base-info--title">{{ title }}</div>
    <div>
      <slot/>
    </div>
    <!-- <wms-cell title="采购日期" :value="showDateTime" clickable @click="pickDateTime" />
    <wms-cell title="供应商" value="" to="/provider/choose" is-link />
    <wms-cell title="仓库" value="" is-link />

    <mt-datetime-picker
      ref="picker"
      v-model="datetime"
      type="datetime"
    />-->
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    title: String
  },
  data() {
    return {
      datetime: ''
    }
  },

  computed: {
    showDateTime() {
      if (this.datetime) {
        return this.$format(this.datetime, 'YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    }
  },

  methods: {
    pickDateTime() {
      this.datetime = new Date()
      this.$refs.picker.open()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-info--title {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
</style>
