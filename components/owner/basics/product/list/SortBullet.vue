<template>
  <Bullet label="销售状态" :content="sortList" @change="onChange"/>
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
          label: '全部',
          value: ''
        },
        {
          label: '销售中',
          value: '1'
        },
        {
          label: '已下架',
          value: '0'
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
