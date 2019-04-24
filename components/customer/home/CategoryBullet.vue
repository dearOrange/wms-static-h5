<template>
  <Bullet
    label="分类"
    :content="categoryList"
    @change="onChange"
  />
</template>

<script>
import Bullet from '@/components/share/filter/Bullet'
import { cateType as getCateTyepeList } from '@/api/public'
export default {
  name: 'CategoryBullet',
  components: {
    Bullet
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      categoryList: []
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let { success, data } = await getCateTyepeList()
      if (success) {
        this.categoryList = data.map(item => ({
          label: item.categoryName,
          value: item.categoryUkid
        }))
      }
    },

    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
