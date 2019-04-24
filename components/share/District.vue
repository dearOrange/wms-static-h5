<template>
  <div class="district">
    <wms-cell title="省市区" :value="pcdText" clickable @click="show = true"/>
    <div v-show="show" class="picker-container">
      <div class="picker">
        <div class="picker-buttons">
          <span @click="show = false">取消</span>
          <span @click="confirm">确认</span>
        </div>
        <mt-picker ref="picker" :slots="slots" value-key="label" @change="onPickerChange"/>
      </div>
      <div class="mask" @click.self="show = false"/>
    </div>
  </div>
</template>
<script>
import { findIndex } from 'lodash'
import { getProviceCityDistrict, connectedName } from '@/utils/area'
let allArea = getProviceCityDistrict()
function toPlain(list) {
  return list.map(({ label, value }) => ({ label, value }))
}

export default {
  name: 'WmsDistrict',
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
    color: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false
    }
  },

  computed: {
    pcdText() {
      return connectedName(this.value, ' ')
    },
    slots() {
      let proviceIndex = 0
      let cityIndex = 0
      let districtIndex = 0

      if (this.value.length) {
        let [proviceCode, cityCode, districtCode] = this.value
        proviceIndex =
          findIndex(allArea, item => item.value === proviceCode) || 0
        cityIndex = findIndex(
          allArea[proviceIndex].children,
          item => item.value === cityCode
        )
        districtIndex = findIndex(
          allArea[proviceIndex].children[cityIndex].children,
          item => item.value === districtCode
        )
      }
      return [
        {
          flex: 1,
          values: toPlain(allArea),
          className: 'provice',
          defaultIndex: proviceIndex
        },
        {
          divider: true,
          content: '-',
          className: 'divider'
        },
        {
          flex: 1,
          values: toPlain(allArea[proviceIndex].children),
          className: 'city',
          defaultIndex: cityIndex
        },
        {
          divider: true,
          content: '-',
          className: 'divider'
        },
        {
          flex: 1,
          values: toPlain(allArea[proviceIndex].children[cityIndex].children),
          className: 'district',
          defaultIndex: districtIndex
        }
      ]
    }
  },
  methods: {
    onPickerChange(picker, [provice, city, district]) {
      let proviceIndex = findIndex(
        allArea,
        item => item.label === provice.label
      )
      if (proviceIndex !== -1 && allArea[proviceIndex].children) {
        picker.setSlotValues(1, toPlain(allArea[proviceIndex].children))
        let cityIndex = findIndex(
          allArea[proviceIndex].children,
          item => item.label === city.label
        )
        if (
          cityIndex !== -1 &&
          allArea[proviceIndex].children[cityIndex].children
        ) {
          picker.setSlotValues(
            2,
            toPlain(allArea[proviceIndex].children[cityIndex].children)
          )
        }
      }
    },
    confirm() {
      let values = this.$refs.picker.getValues()
      // this.pcdText = values.map(item => item.label).join(' ')
      this.$emit('change', values.map(item => item.value))
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.district {
  /deep/ .cell {
    height: 42px;
  }
}
.picker-container {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;

  > .picker {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background: #fff;

    > .picker-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #999;
      > span {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 auto;
        height: 32px;
        border-left: 1px solid #999;
        &:first-child {
          border-left: 0;
        }
      }
    }
  }

  > .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
  }
}
</style>
