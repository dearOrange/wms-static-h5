<template>
  <div class="item">
    <div>
      <div class="classify_card">
        <div>{{ data.categoryName }}</div>
        <div>上级分类：{{ data.parentCategoryName }}</div>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <mt-button plain type="primary" size="small" @click="edit(data.categoryUkid)">编辑</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassifyItem',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    edit(id) {
      this.$router.push({
        path: '/owner/basics/classify/create',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.classify_card {
  padding: 10px;
}
.operation {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  /deep/ button {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
