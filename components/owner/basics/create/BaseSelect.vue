<template>
  <div>
    <div @click="cellPopup">
      <mt-cell :title="title" is-link>
        <span style="color: green">{{ content }}</span>
      </mt-cell>
    </div>
    <mt-popup
      v-model="popupVisible"
      class="pop__box"
      position="bottom"
      popup-transition="popup-fade"
    >
      <div class="pop__title">
        <div
          v-for="item in list"
          :key="item.definedCode"
          @click="changeItem(item.definedName, item.definedCode)"
        >
          {{ item.definedName }}
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    title: {
      type: String
    },
    list: {
      type: Array,
      required: true
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      popupVisible: false,
      content: '',
      activeType: this.value
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.list.find(item => {
        this.content = newVal === item.definedCode ? item.definedName : ''
        return this.content
      })
    }
  },
  methods: {
    cellPopup() {
      this.popupVisible = true
    },
    changeItem(val, type) {
      if (type === this.activeType) {
        return
      }
      this.activeType = type
      this.content = val
      this.popupVisible = false
      this.$emit('change', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.pop__box {
  width: 100%;
  & .pop__title {
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #ccc;
    & > div {
      padding: 10px;
    }
  }
}
</style>
