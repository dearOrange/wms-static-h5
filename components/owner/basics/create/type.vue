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
          :key="item.categoryUkid"
          @click="changeItem(item.categoryName, item.categoryUkid)"
        >
          {{ item.categoryName }}
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'Type',
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
    value: String
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
        newVal = newVal.toString()
        item.categoryUkid = item.categoryUkid.toString()
        this.content = newVal === item.categoryUkid ? item.categoryName : ''
        return this.content
      })
    }
  },
  methods: {
    cellPopup() {
      this.popupVisible = true
    },
    changeItem(val, type) {
      type = type.toString()
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
