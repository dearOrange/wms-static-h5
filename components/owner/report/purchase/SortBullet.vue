<template>
  <Bullet label="时间" :content="sortList" @change="onChange"/>
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
        // {
        //   label: '自定义',
        //   value: ''
        // },
        {
          label: '今天',
          value: 't'
        },
        {
          label: '昨天',
          value: 'y'
        },
        {
          label: '本月',
          value: 'tm'
        },
        {
          label: '上月',
          value: 'lm'
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
