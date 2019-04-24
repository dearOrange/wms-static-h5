<template>
  <Bullet label="结算类型" :content="sortList" @change="onChange"/>
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
          label: '应付账单',
          value: 'FPB'
        },
        {
          label: '应收账单',
          value: 'FRB'
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
