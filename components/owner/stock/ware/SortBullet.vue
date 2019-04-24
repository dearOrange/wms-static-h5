<template>
  <Bullet
    label="排序"
    :content="sortList"
    @change="onChange"
  />
</template>

<script>
import Bullet from '@/components/share/filter/Bullet'
export default {
  name: 'SortBullet',
  components: {
    Bullet
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      sortList: [
        {
          label: '综合',
          value: 'A'
        },
        {
          label: '库存从大到小',
          value: 'B'
        },
        {
          label: '库存从小到大',
          value: 'C'
        },
        {
          label: '商品编码',
          value: 'D'
        }
      ]
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
